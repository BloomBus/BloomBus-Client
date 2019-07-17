import React, { Component } from 'react';
import { LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import lineString from 'turf-linestring';
import bbox from '@turf/bbox';

import AppHeader from './AppHeader';
import LoopsBottomSheet from './LoopsBottomSheet';
import Map from './Map';

import { getLoop } from '../utils/functions';
import firebase from '../utils/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.mapContainerRef = React.createRef();

    this.state = {
      shuttles: {},
      stops: {},
      loops: [],
      loopStops: {},
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

  onStopSelect(loopName, stationName) {
    this.setState(prevState => ({
      selectedTab: 'shuttlesTab',
      selectedLoop: loopName,
      selectedStop: prevState.stops[loopName][stationName],
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
    const { longitude, latitude, zoom } = newViewport.fitBounds(
      [[minLng, minLat], [maxLng, maxLat]],
      {
        padding: 40,
      },
    );

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude,
        latitude,
        zoom,
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
    } else if (viewport.latitude > nwBound.latitude) {
      newViewport.latitude = nwBound.latitude;
    } else if (viewport.longitude > seBound.longitude) {
      newViewport.longitude = seBound.longitude;
    } else if (viewport.latitude < seBound.latitude) {
      newViewport.latitude = seBound.latitude;
    }

    this.setState({ viewport: newViewport });
  }

  onMapClick(pointerEvent) {
    if (!this.state.openBottomSheet) {
      this.setState({
        openBottomSheet: 'loops',
      });
    }
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
    return (
      <React.Fragment>
        <AppHeader />
        {!this.state.loops[0] ? null : (
          <Map
            mapContainerRef={this.mapContainerRef}
            loops={this.state.loops}
            stops={this.state.stops}
            shuttles={this.state.shuttles}
            updateMapDimensions={this.updateMapDimensions}
            mapOptions={this.constants.mapOptions}
            onViewportChange={this.onViewportChange}
            onMapClick={this.onMapClick}
            viewport={this.state.viewport}
          />
        )}
        <LoopsBottomSheet
          open={this.state.openBottomSheet === 'loops'}
          onBottomSheetChange={this.onBottomSheetChange}
          loops={this.state.loops}
          stops={
            this.state.loops[0] && this.state.loopStops[this.state.loopKey] // Only pass stops for the selected loop
              ? this.state.loopStops[this.state.loopKey].map(
                stopKey => this.state.stops[stopKey],
              )
              : []
          }
          onLoopSelect={this.onLoopSelect}
        />
      </React.Fragment>
    );
  }
}

export default Home;