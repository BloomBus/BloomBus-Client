import React, { Component } from 'react';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import lineString from 'turf-linestring';
import bbox from '@turf/bbox';
import { BrowserView, MobileView } from 'react-device-detect';

import LoopsBottomSheet from '../LoopsBottomSheet';
import StopBottomSheet from '../StopBottomSheet';
import Map from '../Map';
import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';

import { StyledHeaderLabel } from './Home-styled';
import LogoBusIcon from './LogoBusIcon';

import { getLoop } from '../../utils/functions';
import firebase from '../../utils/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.mapContainerRef = React.createRef();

    this.state = {
      shuttles: {},
      stops: undefined,
      loops: undefined,
      loopStops: undefined,
      loopKey: '',
      viewport: {
        width: '100%',
        height: '100%',
        latitude: 41.007,
        longitude: -76.451,
        zoom: 14,
        pitch: 0,
        tilt: 0,
      },
      openBottomSheet: 'loops',
    };

    this.onStopSelect = this.onStopSelect.bind(this);
    this.onShuttleSelect = this.onShuttleSelect.bind(this);
    this.onLoopSelect = this.onLoopSelect.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onBottomSheetChange = this.onBottomSheetChange.bind(this);
  }

  componentDidMount() {
    const constantsRef = firebase.database().ref('constants');
    constantsRef.once('value', (constantsSnapshot) => {
      this.constants = constantsSnapshot.val();
    });

    const stopsRef = firebase.database().ref('stops');
    stopsRef.once('value', (stopsSnapshot) => {
      this.setState({
        stops: stopsSnapshot.val(),
      });
    });

    const loopsRef = firebase.database().ref('loops');
    loopsRef.once('value', (loopsSnapshot) => {
      const loops = loopsSnapshot.val().features;
      this.setState({
        loops,
        loopKey: loops[0].properties.key,
      });
    });

    const loopStopsRef = firebase.database().ref('loop-stops');
    loopStopsRef.once('value', (loopStopsSnapshot) => {
      this.setState({
        loopStops: loopStopsSnapshot.val(),
      });
    });

    const shuttlesRef = firebase.database().ref('shuttles');

    shuttlesRef.on('value', (shuttlesSnapshot) => {
      shuttlesSnapshot.forEach((shuttleSnapshot) => {
        this.handleNewValue(shuttleSnapshot);
      });
    });

    shuttlesRef.on('child_removed', (shuttleSnapshot) => {
      this.setState((prevState) => {
        const tempState = prevState;
        delete tempState.shuttles[shuttleSnapshot.key];
        return tempState;
      });
    });
  }

  onStopSelect(stopKey) {
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
        transitionDuration: 200,
      },
    }));
  }

  onShuttleSelect(shuttleID) {
    // skeleton
    this.setState({});
  }

  onLoopSelect(loopKey) {
    const loop = getLoop(loopKey, this.state.loops);
    if (loop === undefined) return;
    const line = lineString(loop.geometry.coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);
    // construct a viewport instance from the current state
    const newViewport = new WebMercatorViewport(this.state.viewport);
    const { longitude, latitude, zoom } = newViewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
      padding: 40,
    });

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500,
      },
      loopKey: loop.properties.key,
    }));
  }

  onViewportChange(viewport) {
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
  }

  onMapClick(pointerEvent) {
    this.setState(prevState => ({
      openBottomSheet: prevState.openBottomSheet ? '' : 'loops',
      selectedStop: null,
    }));
  }

  onBottomSheetChange(isOpen) {
    if (isOpen) return;
    this.setState({
      openBottomSheet: '',
    });
  }

  handleNewValue(shuttleSnapshot) {
    this.setState(prevState => ({
      shuttles: {
        ...prevState.shuttles,
        [shuttleSnapshot.key]: shuttleSnapshot.val(),
      },
    }));
  }

  render() {
    return this.state.loops && this.state.loopStops && this.state.stops ? (
      <>
        <AppHeader>
          <StyledHeaderLabel>BloomBus</StyledHeaderLabel>
          <LogoBusIcon />
        </AppHeader>
        <Map
          mapContainerRef={this.mapContainerRef}
          loops={this.state.loops}
          stops={this.state.stops}
          shuttles={this.state.shuttles}
          selectedStop={this.state.selectedStop}
          updateMapDimensions={this.updateMapDimensions}
          mapOptions={this.constants.mapOptions}
          onViewportChange={this.onViewportChange}
          onMapClick={this.onMapClick}
          onStopSelect={this.onStopSelect}
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
            loopStops={this.state.loopStops}
            onLoopSelect={this.onLoopSelect}
          />
          <StopBottomSheet
            open={this.state.openBottomSheet === 'stop'}
            onBottomSheetChange={this.onBottomSheetChange}
            stop={this.state.stops[this.state.selectedStop]}
          />
        </MobileView>
      </>
    ) : null;
  }
}

export default Home;
