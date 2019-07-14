import React, { Component } from 'react';
import { LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import lineString from 'turf-linestring';
import bbox from '@turf/bbox';

import LoopsCarousel from '../LoopsCarousel/LoopsCarousel';
import Map from '../Map';
import './Home.css';

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
    };

    this.DATA_TIMEOUT = 15; // seconds
    this.onStationSelect = this.onStationSelect.bind(this);
    this.onShuttleSelect = this.onShuttleSelect.bind(this);
    this.onSelectedLoopChanged = this.onSelectedLoopChanged.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  componentDidMount() {
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

  onStationSelect(loopName, stationName) {
    this.setState(prevState => ({
      selectedTab: 'shuttlesTab',
      selectedLoop: loopName,
      selectedStop: prevState.stops[loopName][stationName],
    }));
  }

  onShuttleSelect(loopKey) {
    this.setState(prevState => ({
      selectedShuttle: prevState,
      selectedMarkerType: 'shuttle',
    }));
  }

  onSelectedLoopChanged(index) {
    if (!this.state.loops[index]) return;
    const loop = this.state.loops[index];
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
    this.setState({ viewport });
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
        <header>
          <img src="./bloombus-logo.svg" alt="Shuttle Icon" />
        </header>
        {!this.state.loops[0] ? null : (
          <Map
            mapContainerRef={this.mapContainerRef}
            loops={this.state.loops}
            stops={this.state.stops}
            shuttles={this.state.shuttles}
            viewport={this.state.viewport}
            onViewportChange={this.onViewportChange}
            updateMapDimensions={this.updateMapDimensions}
          />
        )}
        <LoopsCarousel
          loops={this.state.loops}
          stops={
            this.state.loops[0] && this.state.loopStops[this.state.loopKey] // Only pass stops for the selected loop
              ? this.state.loopStops[this.state.loopKey].map(
                stopKey => this.state.stops[stopKey],
              )
              : []
          }
          onSelectedLoopChanged={this.onSelectedLoopChanged}
        />
      </React.Fragment>
    );
  }
}

export default Home;
