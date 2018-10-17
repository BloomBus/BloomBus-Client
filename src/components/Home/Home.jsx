/* global document, google, firebase, moment, window */
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import './Home.css';
import StationsDrawer from '../StationsDrawer/StationsDrawer';
import ShuttlesDrawer from '../ShuttlesDrawer/ShuttlesDrawer';
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

    shuttlesRef.on('child_changed', (shuttlesSnapshot) => {
      shuttlesSnapshot.forEach((shuttleSnapshot) => {
        this.handleNewValue(shuttleSnapshot);
      });
    });

    const stationsRef = firebase.database().ref('bus-stations');
    stationsRef.once('value', (stationsSnapshot) => {
      const stations = stationsSnapshot.val();
      const stationMarkers = {};
      Object.entries(stations).map(([loopName, loopGeoJSON]) => {
        stationMarkers[loopName] = {};
        loopGeoJSON.features.forEach((stationData) => {
          stationMarkers[loopName][stationData.properties.name] = new google.maps.Marker({
            position: {
              lat: stationData.geometry.coordinates[0],
              lng: stationData.geometry.coordinates[1],
            },
            icon: {
              url: './bus-stop.svg',
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32),
              labelOrigin: new google.maps.Point(16, 42),
            },
            title: stationData.properties.name,
            label: stationData.properties.name,
            map: window.map,
          });
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
      selectedStation: prevState.stations[loopName][stationName],
      selectedMarker: prevState.stationMarkers[loopName][stationName],
    }));
  }

  onShuttleSelect(loopKey) {
    this.setState(prevState => ({
      selectedTab: '',
      selectedShuttle: loopKey,
      selectedMarker: prevState.shuttleMarkers[loopKey],
    }));
  }

  handleNewValue(shuttleSnapshot) {
    const shuttleData = shuttleSnapshot.val();
    if (!shuttleData.properties) return;
    const shuttleTimestamp = moment(shuttleData.properties.timestamp);
    const dataIsFresh = shuttleTimestamp.isAfter(
      moment().subtract(this.DATA_TIMEOUT, 'seconds'),
    );

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
      tempShuttleMarkers[shuttleSnapshot.key].setVisible(dataIsFresh);

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
          shuttles={this.state.shuttles}
          isOpen={this.state.selectedTab === 'shuttlesTab'}
          onSelect={this.onShuttleSelect}
        />
        <div id="map" />
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
