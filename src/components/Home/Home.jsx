/* global document, google, firebase, window */
import React, { Component } from 'react';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';
import './Home.css';
import { constructMarker, getBoundsFromLatLngs } from '../../utils/utils';
import { campusBounds, campusCenter, mapStyles } from '../../utils/constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuttleMarkers: {},
      stationMarkers: {},
      shuttles: {},
      stops: {},
      loops: [],
    };
    this.DATA_TIMEOUT = 15; // seconds
    this.onStationSelect = this.onStationSelect.bind(this);
    this.onShuttleSelect = this.onShuttleSelect.bind(this);
    this.highlightLoop = this.highlightLoop.bind(this);
  }

  componentDidMount() {
    window.map = new google.maps.Map(document.getElementById('map'), {
      center: campusCenter,
      zoom: 14,
      styles: mapStyles,
      disableDefaultUI: true,
    });

    window.map.data.setStyle((feature) => {
      let styleOptions;
      if (feature.getProperty('stops')) { // Is a polyline feature of a shuttle loop
        styleOptions = {
          strokeColor: feature.getProperty('color'),
          strokeWidth: 3,
        };
      } else {
        styleOptions = {
          label: {
            text: feature.getProperty('name'),
            fontSize: '12px',
          },
          icon: {
            url: './bus-stop-filled.svg',
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32),
            labelOrigin: new google.maps.Point(16, 42),
          },
          visible: true,
        };
      }
      return styleOptions;
    });

    const stopsRef = firebase.database().ref('stops');
    stopsRef.once('value', (stopsSnapshot) => {
      Object.values(stopsSnapshot.val()).forEach((stop) => {
        window.map.data.addGeoJson(stop);
      });
      this.setState({
        stops: stopsSnapshot.val(),
      });
    });

    const loopsRef = firebase.database().ref('loops');
    loopsRef.once('value', (loopsSnapshot) => {
      window.map.data.addGeoJson(loopsSnapshot.val(), {
        idPropertyName: 'name',
      });
      window.map.fitBounds(campusBounds);
      this.setState({
        loops: loopsSnapshot.val().features,
      });
    });

    const shuttlesRef = firebase.database().ref('shuttles');

    shuttlesRef.on('value', (shuttlesSnapshot) => {
      shuttlesSnapshot.forEach((shuttleSnapshot) => {
        this.handleNewValue(shuttleSnapshot);
      });
    });

    shuttlesRef.on('child_removed', (shuttleSnapshot) => {
      this.state.shuttleMarkers[shuttleSnapshot.key].setMap(null);
      this.setState((prevState) => {
        const tempState = prevState;
        delete tempState.shuttleMarkers[shuttleSnapshot.key];
        delete tempState.shuttles[shuttleSnapshot.key];
        return tempState;
      });
    });
  }

  componentDidUpdate() {
    if (this.state.selectedMarker) {
      window.map.setCenter(this.state.selectedMarker.getPosition());
    }
  }

  onStationSelect(loopName, stationName) {
    this.setState(prevState => ({
      selectedTab: 'shuttlesTab',
      selectedLoop: loopName,
      selectedStation: prevState.stations[loopName][stationName],
      selectedMarker: prevState.stationMarkers[loopName][stationName],
    }));
  }

  onShuttleSelect(loopKey) {
    this.setState(prevState => ({
      selectedShuttle: prevState,
      selectedMarker: prevState.shuttleMarkers[loopKey],
      selectedMarkerType: 'shuttle',
    }));
  }

  handleNewValue(shuttleSnapshot) {
    const shuttleData = shuttleSnapshot.val();
    const latLng = new google.maps.LatLng({
      lat: shuttleData.geometry.coordinates[0],
      lng: shuttleData.geometry.coordinates[1],
    });

    if (!shuttleData.properties) return;

    this.setState((prevState) => {
      const newShuttles = prevState.shuttles;
      newShuttles[shuttleSnapshot.key] = shuttleData;

      const tempShuttleMarkers = prevState.shuttleMarkers;
      /*
       * Check to see if this shuttle's marker hasn't been created yet. Possible if there are now
       * more records under this loop's object than there were previously.
       */
      if (!prevState.shuttleMarkers[shuttleSnapshot.key]) {
        tempShuttleMarkers[shuttleSnapshot.key] = constructMarker(
          shuttleSnapshot,
        );
      }

      const thisMarker = tempShuttleMarkers[shuttleSnapshot.key];
      thisMarker.setPosition(latLng);
      const hasPrevCoordinates = !!shuttleData.properties.prevCoordinates;
      let oldLatLng;
      if (hasPrevCoordinates) {
        oldLatLng = new google.maps.LatLng({
          lat: shuttleData.properties.prevCoordinates[0],
          lng: shuttleData.properties.prevCoordinates[1],
        });
      }
      const heading = google.maps.geometry.spherical.computeHeading(oldLatLng
          || thisMarker.getPosition(), thisMarker.getPosition())
          || Math.floor(Math.random() * 360);
      console.log(heading);

      return {
        shuttles: newShuttles,
        shuttleMarkers: tempShuttleMarkers,
      };
    });
  }

  highlightLoop(index) {
    if (!this.state.loops[index]) return;
    const loop = this.state.loops[index];
    const loopId = loop.properties.name;
    const loopLatLngs = window.map.data.getFeatureById(loopId).getGeometry().getArray();
    const loopBounds = getBoundsFromLatLngs(loopLatLngs);
    window.map.fitBounds(loopBounds, 30);
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <img src="./bloombus-logo.svg" alt="Shuttle Icon" />
        </header>
        <div id="map" />
        <CarouselWrapper loops={this.state.loops || []} stops={this.state.stops || {}} highlightLoop={this.highlightLoop} />
      </React.Fragment>
    );
  }
}

export default Home;
