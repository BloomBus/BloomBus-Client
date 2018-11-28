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
    console.log('update')
    const shuttleData = shuttleSnapshot.val();

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
      /*
      const thisMarker = tempShuttleMarkers[shuttleSnapshot.key];
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
      const icon = {
        url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" transform="rotate(270 300 200)"><g fill="%238d8f93" fill-rule="evenodd"><path d="M460.2 187.5l-66.4-3.5c-8.5-.5-13.3-2.5-13.8-4.3l-1.5-5.4c-.2-1.3 3.8-2 10-2h13a241.3 241.3 0 0 1 33.4 1.7l26.4 4c5.7.9 9.9 2.1 9.7 3.5v4.8c0 .8-6 1.5-10.8 1.2"/><path d="M4.5 32.8C.8 47.8-.2 75.3-.2 103c0 27.6 1 55.4 4.6 70.3 2.8 11.6 13.4 17 28.8 16.7h454c20.5.3 39.8.3 48.8-1.3 20-3 34-8.8 37-18.4 6-17.6 8.8-42.4 8.8-67.3S579 53.2 573 35.6c-3-9.5-17-15.2-37-18.4-9-1.4-28.3-1.4-48.8-1.2h-454c-15.4-.4-26 5-28.8 16.8"/></g><path d="M430.5 174l5 11.6-41.7-2.1c-2.9-.1-5.9-.6-8.8-1.3-5-1.3-4.6-2.6-6-8 0-1 7.5-1.4 8.4-1.4 14.4 0 28.8-.3 43.1 1.2m9.7 11.9l-4.8-11.3c11 1.7 22.3 2.5 32.9 5.4 3.4 1.1 2.4 2.3 2.2 6-.8 1-8.2 1-9.3 1l-21-1.1" fill="%23d2d2d1" fill-rule="evenodd"/><path d="M471.2 187c1.3 0 2.5.5 4.2 2.4 2.8 2.8 1.4 4.5.5 7.8-1 3.6-.4 3-2.7 6.6-1.5 2-3 2.3-5.7 2.3-1.2 0-2.6-1.1-2.5-2.5l3.8-14.2c.2-1.3 1.1-2.5 2.5-2.5" fill="%238d8f93" fill-rule="evenodd"/><path d="M440.7 52c2.5 21.6 3.8 43.6 2.8 65.4-.2 12.8-1.7 26.2-3 39l-1.7 12.5c15.2 2 30.1 6.5 45.4 8 7 .5 15.3.6 19.3-6.2 2.5-4.4 3.8-11.2 5-16.3 8-36.3 7.5-76.3-2.5-112.2-1.2-4.7-2.7-9-7.3-11.2-8.5-3.8-21.3-1-30 .8a288 288 0 0 1-29.7 5.4c-.2 1 .3 3.3.4 4.3l1.3 10.5" fill="%23d2d2d1" fill-rule="evenodd"/><path d="M538.3 170c-2 11.3 6 18.1 18.2 7.5 4-3.5 11.8-13.1 11.7-31-9 2.5-28.3 14.3-30 23.6" fill="%23e9e8e8" fill-rule="evenodd"/><path d="M44 46.3c0-3-.7-5.4-1.5-5.4h-7c-.8 0-4 3.4-4.2 6.2a775 775 0 0 0-2.8 56c0 16.4 1.2 32.9 2.8 56 0 2.9 3.4 6.3 4.2 6.3h7c.8 0 1.4-2.5 1.4-5.4-1.2-19-2.2-37.8-2.2-56.9s.5-37.8 2.2-56.8" fill="%238d8f93" fill-rule="evenodd"/><path d="M35.7 41.3c-2 .6-3.7 4-3.8 5.8C30.8 63 29 79.4 29 95.4c-.6 21.2 1.3 42.6 2.8 63.7.4 1.8 2 5.2 3.7 5.8h7c1.8-3.5.7-10 .4-13.8-1-18.2-2.1-36.8-1.6-55.1 0-16.6.9-33.3 2.2-49.8a12 12 0 0 0-1-5h-6.8M430.5 32.1l5-11.7-41.7 2.2c-2.9.1-5.9.5-8.8 1.3-5 1.2-4.6 2.6-6 8 0 1.1 7.5 1.5 8.4 1.5 14.4 0 28.8.2 43.1-1.3m9.7-12l-4.8 11.3c11-1.6 22.3-2.5 32.9-5.3 3.4-1.1 2.4-2.2 2.2-6-.8-1-8.2-1-9.3-1l-21 1" fill="%23d2d2d1" fill-rule="evenodd"/><path d="M471.3 19.3c1.2 0 2.5-.7 4.1-2.6 2.9-2.8 1.4-4.4.5-7.8-1-3.5-.2-3-2.6-6.5-1.5-2.1-3.1-2.4-5.8-2.4-1.2 0-2.6 1.1-2.3 2.5l3.7 14.3c.3 1.2 1 2.4 2.4 2.4" fill="%238d8f93" fill-rule="evenodd"/><path d="M538.3 36c-2-11.3 6-18 18.2-7.5a41 41 0 0 1 11.7 31.1c-9-2.5-28.3-14.2-30-23.6" fill="%23e9e8e8" fill-rule="evenodd"/><path d="M565.4 143.8c1.6-.6 2.5-1 3.4-2.6.5-1 1.5-2.6 1.5-5.3a189.1 189.1 0 0 0 0-65.3c0-2.7-1-4.3-1.5-5.3a4.5 4.5 0 0 0-3.4-2.5 197 197 0 0 1 4.5 39.8c.3 13.9-2.2 28.8-4.5 41.3" fill="%233b3b3c" fill-rule="evenodd"/><rect ry="8.1" rx="8.1" height="16.3" width="310.6" y="22" x="53.7" fill="%23d2d2d1"/><path d="M297.5 27.8v4.7c0 3.3.3 6.1.5 6h1.8c.4 0 .5-2.6.5-6v-5c0-3.3-.3-6-.5-6H298c-.2 0-.5 2.8-.5 6.1m40.2.5V33c0 3.3 0 6 .5 6h1.7c.3 0 .5-2.6.5-6v-5c0-3.3-.2-6-.5-6H338a23 23 0 0 0-.3 6.1m-79.3-.2v4.7c0 3.1.3 5.9.5 5.9h1.8c.2 0 .5-2.6.5-5.9V28c0-3.3-.3-5.9-.5-5.9h-1.8c-.2 0-.5 2.5-.5 5.9m-40.7.1v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.9V28c0-3.3-.2-5.9-.5-5.9h-1.6c-.3 0-.5 2.6-.5 5.9m-40 0v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.9V28c0-3.3-.2-5.9-.5-5.9h-1.7c-.3 0-.5 2.6-.5 5.9m-40 0v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.9V28c0-3.3-.2-5.9-.5-5.9h-1.7c-.3 0-.5 2.6-.5 5.9" fill="%238d8f93" fill-rule="evenodd"/><rect ry="8.1" rx="8.1" height="16.3" width="311.8" y="169" x="52.5" fill="%23d2d2d1"/><path d="M297.5 174.8v4.8c0 3.3.3 6.2.5 6h1.8c.4 0 .5-2.6.5-6v-5c0-3.2-.3-6-.5-6H298c-.2 0-.5 2.8-.5 6.2m40.2.2v5c0 3.3 0 6 .5 6h1.7c.3 0 .5-2.6.5-6v-5c0-3.3-.2-6-.5-6H338a23 23 0 0 0-.3 6.1m-79.3-.2v4.7c0 3.2.3 5.9.5 5.9h1.8c.2 0 .5-2.6.5-5.9V175c0-3.3-.3-5.9-.5-5.9h-1.8c-.2 0-.5 2.5-.5 5.9m-40.7.1v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.8V175c0-3.3-.2-5.9-.5-5.9h-1.6c-.3 0-.5 2.7-.5 5.9m-40 0v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.8V175c0-3.3-.2-5.9-.5-5.9h-1.7c-.3 0-.5 2.7-.5 5.9m-40 0v4.8c0 3.2.2 5.8.5 5.8h1.7c.3 0 .5-2.5.5-5.8V175c0-3.3-.2-5.9-.5-5.9h-1.7c-.3 0-.5 2.7-.5 5.9" fill="%238d8f93" fill-rule="evenodd"/></svg>`,
        scaledSize: new google.maps.Size(32, 32),
        labelOrigin: new google.maps.Point(16, 24),
      };
      thisMarker.setIcon(icon); */

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
