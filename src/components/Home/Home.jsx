/* global document, google, firebase, window */
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import './Home.css';
import StationsDrawer from '../StationsDrawer/StationsDrawer';
import ShuttlesDrawer from '../ShuttlesDrawer/ShuttlesDrawer';
import BottomSheet from '../BottomSheet/BottomSheet';
import constructMarker from '../../utils/constructMarker';
import { campusBounds, campusCenter, mapStyles } from '../../utils/constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      shuttleMarkers: {},
      stationMarkers: {},
      shuttles: {},
      stations: {},
    };
    this.DATA_TIMEOUT = 15; // seconds
    this.onStationSelect = this.onStationSelect.bind(this);
    this.onShuttleSelect = this.onShuttleSelect.bind(this);
  }

  componentDidMount() {
    window.map = new google.maps.Map(document.getElementById('map'), {
      center: campusCenter,
      zoom: 14,
      styles: mapStyles,
    });
    window.map.fitBounds(campusBounds);

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

    const stationsRef = firebase.database().ref('bus-stations');
    stationsRef.once('value', (stationsSnapshot) => {
      const stations = stationsSnapshot.val();
      const stationMarkers = {};

      // An array that stores the name of each station. Used to check against duplicate stations
      // between loops.
      const createdStationNames = [];
      Object.entries(stations).map(([loopName, loopGeoJSON]) => {
        stationMarkers[loopName] = {};
        loopGeoJSON.features.forEach((stationData) => {
          if (createdStationNames.includes(stationData.properties.name)) return null;
          createdStationNames.push(stationData.properties.name);
          stationMarkers[loopName][stationData.properties.name] = new google.maps.Marker({
            position: {
              lat: stationData.geometry.coordinates[0],
              lng: stationData.geometry.coordinates[1],
            },
            icon: {
              url: './bus-stop-filled.svg',
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32),
              labelOrigin: new google.maps.Point(16, 42),
            },
            title: stationData.properties.name,
            label: {
              text: stationData.properties.name,
              fontSize: '12px',
            },
            map: window.map,
          });
          return null;
        });
        return null;
      });

      this.setState({
        stations,
        stationMarkers,
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
      selectedTab: '',
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
      const heading = google.maps.geometry.spherical
        .computeHeading(oldLatLng || thisMarker.getPosition(), thisMarker.getPosition()) || Math.floor(Math.random() * 360);
      console.log(heading);

      return {
        shuttles: newShuttles,
        shuttleMarkers: tempShuttleMarkers,
      };
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <header>
          <img src="./bloombus-logo.svg" alt="Shuttle Icon" />
        </header>
        <StationsDrawer
          stations={this.state.stations}
          isOpen={this.state.selectedTab === 'stationsTab'}
          onSelect={this.onStationSelect}
        />
        <ShuttlesDrawer
          shuttles={Object.values(this.state.shuttles).filter(shuttle => shuttle.properties.loopKey === this.state.selectedLoop)}
          isOpen={this.state.selectedTab === 'shuttlesTab'}
          onSelect={this.onShuttleSelect}
        />
        <div id="map" />
        {/* <BottomSheet
          title={this.state.selectedMarkerType === 'shuttle' ? this.state.selectedShuttle.properties.loopDisplayName : 'Station'}
          statusText="foo"
          isOpen={!!this.state.selectedMarkerType}
        /> */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          style={{ height: '60px' }}
        >
          <TabBar.Item
            title="Stations"
            key="Stations"
            icon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./bus-stop-o.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selectedIcon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./bus-stop.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selected={this.state.selectedTab === 'stationsTab'}
            onPress={() => {
              this.setState(prevState => (
                {
                  selectedTab: prevState.selectedTab === 'stationsTab' ? '' : 'stationsTab',
                }
              ));
            }}
          />
          <TabBar.Item
            title="Shuttles"
            key="Shuttles"
            icon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./shuttle-o.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selectedIcon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./shuttle.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selected={this.state.selectedTab === 'shuttlesTab'}
            onPress={() => {
              this.setState(prevState => (
                {
                  selectedTab: prevState.selectedTab === 'shuttlesTab' ? '' : 'shuttlesTab',
                }
              ));
            }}
          />
          <TabBar.Item
            title="About"
            key="About"
            icon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./info-o.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selectedIcon={(
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./info.svg) center center /  21px 21px no-repeat',
                }}
              />
            )}
            selected={this.state.selectedTab === 'aboutTab'}
            onPress={() => {
              this.setState({
                selectedTab: '',
              });
              window.open('http://intranet.bloomu.edu/documents/police/BusSchedule.pdf');
            }}
          />
        </TabBar>
      </div>
    );
  }
}

export default Home;
