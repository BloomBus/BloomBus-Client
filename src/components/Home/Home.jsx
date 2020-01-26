/* globals GeolocationCoordinates */

// Framework and third-party non-ui
import React, { Component } from 'react';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { bbox, lineString } from '@turf/turf';
import { BrowserView, MobileView } from 'react-device-detect';
import { Switch, Route, withRouter } from 'react-router-dom';

// Local helpers/utils/modules
import { getLoop } from '../../utils/functions';
import firebase from '../../utils/firebase';

// Component specific modules (Component-styled, etc.)
import { StyledHeaderLogoLabel, StyledLoaderWrapper } from './Home-styled';
import {
  LeftHeader,
  CenterHeader,
  RightHeader
} from '../AppHeader/AppHeader-styled';

// App components
import LoopsBottomSheet from '../LoopsBottomSheet';
import LoopStopsBottomSheet from '../LoopStopsBottomSheet';
import StopInfoCard from '../StopInfoCard';
import ShuttleBottomSheet from '../ShuttleBottomSheet';
import Map from '../Map';
import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';
import OverflowMenu from '../OverflowMenu';

// Third-party components (buttons, icons, etc.)
import Loader from 'calcite-react/Loader';
import Modal from 'calcite-react/Modal';
import Button from 'calcite-react/Button';
import { CalciteP } from 'calcite-react/Elements';
import LogoBusIcon from './LogoBusIcon';

// JSON

// CSS

class Home extends Component {
  state = {
    isLoading: true,
    loops: null,
    stops: null,
    shuttles: null,
    loopStops: null,
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 41.007,
      longitude: -76.451,
      zoom: 14,
      pitch: 0,
      tilt: 0
    },
    showOutOfBoundsModal: false
  };

  mapContainerRef = React.createRef();

  componentDidMount() {
    this.initFirebaseListeners();
    this.props.history.push('/loops');
  }

  initFirebaseListeners = () => {
    const promises = [];

    const constantsRef = firebase.database().ref('constants');
    promises.push(
      constantsRef.once('value', constantsSnapshot => {
        this.constants = constantsSnapshot.val();
      })
    );

    const stopsRef = firebase.database().ref('stops');
    promises.push(
      stopsRef.once('value', stopsSnapshot => {
        this.setState({
          stops: stopsSnapshot.val()
        });
      })
    );

    const loopsRef = firebase.database().ref('loops');
    promises.push(
      loopsRef.once('value', loopsSnapshot => {
        const loops = loopsSnapshot.val().features;
        this.setState({
          loops
        });
      })
    );

    const loopStopsRef = firebase.database().ref('loop-stops');
    promises.push(
      loopStopsRef.once('value', loopStopsSnapshot => {
        this.setState({
          loopStops: loopStopsSnapshot.val()
        });
      })
    );

    Promise.all(promises).then(res => {
      this.setState({ isLoading: false });
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
  };

  onStopSelect = stopKey => {
    const [longitude, latitude] = this.state.stops[
      stopKey
    ].geometry.coordinates;
    this.setState(
      prevState => ({
        viewport: {
          ...prevState.viewport,
          longitude,
          latitude,
          zoom: 16,
          transitionInterpolator: new LinearInterpolator(),
          transitionDuration: 200
        }
      }),
      () => {
        this.props.history.push(`/stop/${stopKey}`);
      }
    );
  };

  onShuttleSelect = shuttleKey => {
    const [longitude, latitude] = this.state.shuttles[
      shuttleKey
    ].geometry.coordinates;
    this.setState(
      prevState => ({
        viewport: {
          ...prevState.viewport,
          longitude,
          latitude,
          zoom: 16,
          transitionInterpolator: new LinearInterpolator(),
          transitionDuration: 200
        }
      }),
      () => {
        this.props.history.push(`/shuttle/${shuttleKey}`);
      }
    );
  };

  onLoopSelect = loopKey => {
    const loop = getLoop(loopKey, this.state.loops);
    if (loop === undefined) return;
    const line = lineString(loop.geometry.coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);
    // construct a viewport instance from the current state
    const newViewport = new WebMercatorViewport(this.state.viewport);
    const { longitude, latitude, zoom } = newViewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat]
      ],
      {
        padding: 40
      }
    );

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500
      }
    }));
    this.props.history.push(`/loop/${loopKey}`);
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
    const { pathname } = this.props.location;
    this.props.history.push(pathname !== '/' ? '/' : '/loops');
  };

  onGeolocate = data => {
    if (
      data.hasOwnProperty('coords') &&
      data.coords instanceof GeolocationCoordinates
    ) {
      const { nwBound, seBound } = this.constants.mapOptions;
      const { latitude, longitude } = data.coords;
      const outOfBounds =
        latitude > nwBound.latitude ||
        longitude < nwBound.longitude ||
        latitude < seBound.latitude ||
        longitude > seBound.longitude;
      this.setState({
        userLocation: [longitude, latitude],
        showOutOfBoundsModal: outOfBounds
      });
    }
  };

  // Fires when a bottomsheet opens/closes
  onBottomSheetChange = isOpen => {
    if (isOpen) return;
    this.props.history.push('/');
  };

  // Process a shuttle update
  handleNewValue = shuttleSnapshot => {
    const shuttle = shuttleSnapshot.val();
    this.setState(prevState => ({
      shuttles: {
        ...prevState.shuttles,
        [shuttleSnapshot.key]: shuttle
      }
    }));
    // Track selected shuttle
    const { shuttleID } = this.props.match.params;
    if (shuttleID) {
      // Get selected shuttle by its UUID
      const selectedShuttle = this.state.shuttles[shuttleID];
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
    return this.state.isLoading ? (
      <StyledLoaderWrapper>
        <Loader text="Loading..." />
      </StyledLoaderWrapper>
    ) : (
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
        <Route path={['/stop/:stopKey', '/loop/:loopKey', '/']}>
          <Map
            mapContainerRef={this.mapContainerRef}
            loops={this.state.loops}
            stops={this.state.stops}
            loopStops={this.state.loopStops}
            shuttles={this.state.shuttles}
            updateMapDimensions={this.updateMapDimensions}
            mapOptions={this.constants.mapOptions}
            viewport={this.state.viewport}
            onViewportChange={this.onViewportChange}
            onMapClick={this.onMapClick}
            onStopSelect={this.onStopSelect}
            onShuttleSelect={this.onShuttleSelect}
            onGeolocate={this.onGeolocate}
          />
        </Route>
        <BrowserView>
          <Sidebar
            loops={this.state.loops}
            stops={this.state.stops}
            loopStops={this.state.loopStops}
            shuttles={this.state.shuttles}
            onLoopSelect={this.onLoopSelect}
            onStopSelect={this.onStopSelect}
            onShuttleSelect={this.onShuttleSelect}
          />
        </BrowserView>
        <MobileView>
          <Switch>
            <Route exact path="/loops">
              {this.state.loops ? (
                <LoopsBottomSheet
                  loops={this.state.loops}
                  stops={this.state.stops}
                  shuttles={this.state.shuttles}
                  onLoopSelect={this.onLoopSelect}
                  onBottomSheetChange={this.onBottomSheetChange}
                />
              ) : null}
            </Route>
            <Route path="/loop/:loopKey">
              <LoopStopsBottomSheet
                loopStops={this.state.loopStops}
                stops={this.state.stops}
                onStopSelect={this.onStopSelect}
                onBottomSheetChange={this.onBottomSheetChange}
              />
            </Route>
            <Route path="/stop/:stopKey">
              <StopInfoCard
                stops={this.state.stops}
                loopStops={this.state.loopStops}
                loops={this.state.loops}
                userLocation={this.state.userLocation}
              />
            </Route>
            <Route path="/shuttle/:shuttleID">
              <ShuttleBottomSheet
                shuttles={this.state.shuttles}
                onBottomSheetChange={this.onBottomSheetChange}
              />
            </Route>
          </Switch>
        </MobileView>
        <Modal
          open={this.state.showOutOfBoundsModal}
          onRequestClose={() => this.setState({ showOutOfBoundsModal: false })}
          appElement={document.body}
          title="Out of Boundaries"
          actions={[
            <Button
              key="dismiss"
              onClick={() => this.setState({ showOutOfBoundsModal: false })}
            >
              Dismiss
            </Button>
          ]}
        >
          <CalciteP>
            Sorry, your current location is outside of the region supported by
            this app. Please deactivate the location tracking button.
          </CalciteP>
        </Modal>
      </>
    );
  }
}

export default withRouter(Home);
