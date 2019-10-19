// Framework and third-party non-ui
import React, { Component } from 'react';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import lineString from 'turf-linestring';
import bbox from '@turf/bbox';
import { BrowserView, MobileView } from 'react-device-detect';
import { withRouter } from 'react-router-dom';

// Local helpers/utils/modules
import { getLoop } from '../../utils/functions';
import firebase from '../../utils/firebase';

// Component specific modules (Component-styled, etc.)
import { StyledHeaderLogoLabel } from './Home-styled';

// App components
import LoopsBottomSheet from '../LoopsBottomSheet';
import LoopStopsBottomSheet from '../LoopStopsBottomSheet';
import StopBottomSheet from '../StopBottomSheet';
import ShuttleBottomSheet from '../ShuttleBottomSheet';
import Map from '../Map';
import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';
import OverflowMenu from '../OverflowMenu';

// Third-party components (buttons, icons, etc.)
import { LeftHeader, CenterHeader, RightHeader } from '../AppHeader/AppHeader-styled';
import LogoBusIcon from './LogoBusIcon';

// JSON

// CSS

class Home extends Component {
  state = {
    loops: undefined,
    stops: undefined,
    shuttles: undefined,
    loopStops: undefined,
    selectedLoop: '',
    selectedStop: '',
    selectedLoopStops: [],
    selectedShuttle: '',
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 41.007,
      longitude: -76.451,
      zoom: 14,
      pitch: 0,
      tilt: 0
    },
    openBottomSheet: 'loops'
  };

  mapContainerRef = React.createRef();

  componentDidMount() {
    const constantsRef = firebase.database().ref('constants');
    constantsRef.once('value', constantsSnapshot => {
      this.constants = constantsSnapshot.val();
    });

    const stopsRef = firebase.database().ref('stops');
    stopsRef.once('value', stopsSnapshot => {
      this.setState({
        stops: stopsSnapshot.val()
      });
    });

    const loopsRef = firebase.database().ref('loops');
    loopsRef.once('value', loopsSnapshot => {
      const loops = loopsSnapshot.val().features;
      this.setState({
        loops
      });
    });

    const loopStopsRef = firebase.database().ref('loop-stops');
    loopStopsRef.once('value', loopStopsSnapshot => {
      this.setState({
        loopStops: loopStopsSnapshot.val()
      });
    });

    const shuttlesRef = firebase.database().ref('shuttles');

    shuttlesRef.on('value', shuttlesSnapshot => {
      shuttlesSnapshot.forEach(shuttleSnapshot => {
        this.handleNewValue(shuttleSnapshot);
      });
    });

    shuttlesRef.on('child_removed', shuttleSnapshot => {
      this.setState(prevState => {
        const tempState = prevState;
        delete tempState.shuttles[shuttleSnapshot.key];
        return tempState;
      });
    });
  }

  onStopSelect = stopKey => {
    const [longitude, latitude] = this.state.stops[stopKey].geometry.coordinates;
    this.setState(prevState => ({
      selectedStop: stopKey,
      openBottomSheet: 'stop',
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom: 16,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: 200
      }
    }));
  };

  onShuttleSelect = shuttleKey => {
    const [longitude, latitude] = this.state.shuttles[shuttleKey].geometry.coordinates;
    this.setState(prevState => ({
      selectedShuttle: shuttleKey,
      openBottomSheet: 'shuttle',
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom: 16,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: 200
      }
    }));
  };

  onLoopSelect = loopKey => {
    const loop = getLoop(loopKey, this.state.loops);
    if (loop === undefined) return;
    const line = lineString(loop.geometry.coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);
    // construct a viewport instance from the current state
    const newViewport = new WebMercatorViewport(this.state.viewport);
    const { longitude, latitude, zoom } = newViewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
      padding: 40
    });

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500
      },
      selectedLoop: loopKey,
      selectedLoopStops: prevState.loopStops[loopKey],
      openBottomSheet: 'loop-stops'
    }));
  };

  onViewportChange = viewport => {
    const newViewport = viewport;
    const { nwBound, seBound } = this.constants.mapOptions;
    // Clamp viewport bounds
    if (viewport.longitude < nwBound.longitude) {
      newViewport.longitude = nwBound.longitude;
    } else if (viewport.longitude > seBound.longitude) {
      newViewport.longitude = seBound.longitude;
    }
    if (viewport.latitude > nwBound.latitude) {
      newViewport.latitude = nwBound.latitude;
    } else if (viewport.latitude < seBound.latitude) {
      newViewport.latitude = seBound.latitude;
    }

    this.setState({ viewport: newViewport });
  };

  onMapClick = pointerEvent => {
    this.setState(prevState => ({
      openBottomSheet: prevState.openBottomSheet ? '' : 'loops',
      selectedStop: '',
      selectedLoop: '',
      selectedLoopStops: [],
      selectedShuttle: ''
    }));
  };

  onBottomSheetChange = isOpen => {
    if (isOpen) return;
    this.setState({
      openBottomSheet: ''
    });
  };

  handleNewValue = shuttleSnapshot => {
    const shuttle = shuttleSnapshot.val();
    this.setState(prevState => ({
      shuttles: {
        ...prevState.shuttles,
        [shuttleSnapshot.key]: shuttle
      }
    }));
    // Track selected shuttle
    if (this.state.selectedShuttle) {
      // Get selected shuttle by its UUID
      const selectedShuttle = this.state.shuttles[this.state.selectedShuttle];
      this.setState(prevState => {
        const [longitude, latitude] = selectedShuttle.geometry.coordinates;
        const newViewport = {
          ...prevState.viewport,
          longitude,
          latitude,
          transitionDuration: 1000,
          transitionInterpolator: new LinearInterpolator()
        };
        return { viewport: newViewport };
      });
    }
  };

  render() {
    return this.state.loops && this.state.loopStops && this.state.stops ? (
      <>
        <AppHeader>
          <LeftHeader />
          <CenterHeader>
            <StyledHeaderLogoLabel>BloomBus</StyledHeaderLogoLabel>
            <LogoBusIcon />
          </CenterHeader>
          <RightHeader>
            <OverflowMenu />
          </RightHeader>
        </AppHeader>
        <Map
          mapContainerRef={this.mapContainerRef}
          loops={this.state.loops}
          stops={this.state.stops}
          shuttles={this.state.shuttles}
          selectedStop={this.state.selectedStop}
          selectedLoopStops={this.state.selectedLoopStops}
          updateMapDimensions={this.updateMapDimensions}
          mapOptions={this.constants.mapOptions}
          onViewportChange={this.onViewportChange}
          onMapClick={this.onMapClick}
          onStopSelect={this.onStopSelect}
          onShuttleSelect={this.onShuttleSelect}
          viewport={this.state.viewport}
        />
        <BrowserView>
          <Sidebar
            loops={this.state.loops}
            stops={this.state.stops}
            loopStops={this.state.loopStops}
            onLoopSelect={this.onLoopSelect}
          />
        </BrowserView>
        <MobileView>
          <LoopsBottomSheet
            open={this.state.openBottomSheet === 'loops'}
            onBottomSheetChange={this.onBottomSheetChange}
            loops={this.state.loops}
            stops={this.state.stops}
            shuttles={this.state.shuttles}
            onLoopSelect={this.onLoopSelect}
          />
          <LoopStopsBottomSheet
            open={this.state.openBottomSheet === 'loop-stops'}
            onBottomSheetChange={this.onBottomSheetChange}
            selectedLoop={this.state.selectedLoop}
            selectedLoopStops={this.state.selectedLoopStops}
            stops={this.state.stops}
            onStopSelect={this.onStopSelect}
          />
          <StopBottomSheet
            open={this.state.openBottomSheet === 'stop'}
            onBottomSheetChange={this.onBottomSheetChange}
            stop={this.state.stops[this.state.selectedStop]}
          />
          {this.state.selectedShuttle && (
            <ShuttleBottomSheet
              open={this.state.openBottomSheet === 'shuttle'}
              onBottomSheetChange={this.onBottomSheetChange}
              shuttle={this.state.shuttles[this.state.selectedShuttle]}
            />
          )}
        </MobileView>
      </>
    ) : null;
  }
}

export default withRouter(Home);
