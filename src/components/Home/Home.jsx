/* global document, google, firebase, moment */
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import './Home.css';
import StationsDrawer from '../StationsDrawer/StationsDrawer.jsx';
import ShuttlesDrawer from '../ShuttlesDrawer/ShuttlesDrawer.jsx';
import StationsContext from '../../contexts/StationsContext.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      shuttleMarkers: {},
      stationMarkers: {},
      shuttles: {},
    }
    this.DATA_TIMEOUT = 15; // seconds
    this.onStationSelect = this.onStationSelect.bind(this);
    this.onShuttleSelect = this.onShuttleSelect.bind(this);
  }

  constructMarker(shuttleSnapshot) {
    const shuttleData = shuttleSnapshot.val();
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng({
        lat: shuttleData.geometry.coordinates[0],
        lng: shuttleData.geometry.coordinates[1],
      }),
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1ODMuMiIgaGVpZ2h0PSIyMDYuMSI+PGcgZmlsbD0iIzhkOGY5MyIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNDYwLjIgMTg3LjVsLTY2LjQtMy41Yy04LjUtLjUtMTMuMy0yLjUtMTMuOC00LjNsLTEuNS01LjRjLS4yLTEuMyAzLjgtMiAxMC0yaDEzYTI0MS4zIDI0MS4zIDAgMCAxIDMzLjQgMS43bDI2LjQgNGM1LjcuOSA5LjkgMi4xIDkuNyAzLjV2NC44YzAgLjgtNiAxLjUtMTAuOCAxLjIiLz48cGF0aCBkPSJNNC41IDMyLjhDLjggNDcuOC0uMiA3NS4zLS4yIDEwM2MwIDI3LjYgMSA1NS40IDQuNiA3MC4zIDIuOCAxMS42IDEzLjQgMTcgMjguOCAxNi43aDQ1NGMyMC41LjMgMzkuOC4zIDQ4LjgtMS4zIDIwLTMgMzQtOC44IDM3LTE4LjQgNi0xNy42IDguOC00Mi40IDguOC02Ny4zUzU3OSA1My4yIDU3MyAzNS42Yy0zLTkuNS0xNy0xNS4yLTM3LTE4LjQtOS0xLjQtMjguMy0xLjQtNDguOC0xLjJoLTQ1NGMtMTUuNC0uNC0yNiA1LTI4LjggMTYuOCIvPjwvZz48cGF0aCBkPSJNNDMwLjUgMTc0bDUgMTEuNi00MS43LTIuMWMtMi45LS4xLTUuOS0uNi04LjgtMS4zLTUtMS4zLTQuNi0yLjYtNi04IDAtMSA3LjUtMS40IDguNC0xLjQgMTQuNCAwIDI4LjgtLjMgNDMuMSAxLjJtOS43IDExLjlsLTQuOC0xMS4zYzExIDEuNyAyMi4zIDIuNSAzMi45IDUuNCAzLjQgMS4xIDIuNCAyLjMgMi4yIDYtLjggMS04LjIgMS05LjMgMWwtMjEtMS4xIiBmaWxsPSIjZDJkMmQxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNNDcxLjIgMTg3YzEuMyAwIDIuNS41IDQuMiAyLjQgMi44IDIuOCAxLjQgNC41LjUgNy44LTEgMy42LS40IDMtMi43IDYuNi0xLjUgMi0zIDIuMy01LjcgMi4zLTEuMiAwLTIuNi0xLjEtMi41LTIuNWwzLjgtMTQuMmMuMi0xLjMgMS4xLTIuNSAyLjUtMi41IiBmaWxsPSIjOGQ4ZjkzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNNDQwLjcgNTJjMi41IDIxLjYgMy44IDQzLjYgMi44IDY1LjQtLjIgMTIuOC0xLjcgMjYuMi0zIDM5bC0xLjcgMTIuNWMxNS4yIDIgMzAuMSA2LjUgNDUuNCA4IDcgLjUgMTUuMy42IDE5LjMtNi4yIDIuNS00LjQgMy44LTExLjIgNS0xNi4zIDgtMzYuMyA3LjUtNzYuMy0yLjUtMTEyLjItMS4yLTQuNy0yLjctOS03LjMtMTEuMi04LjUtMy44LTIxLjMtMS0zMCAuOGEyODggMjg4IDAgMCAxLTI5LjcgNS40Yy0uMiAxIC4zIDMuMy40IDQuM2wxLjMgMTAuNSIgZmlsbD0iI2QyZDJkMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTUzOC4zIDE3MGMtMiAxMS4zIDYgMTguMSAxOC4yIDcuNSA0LTMuNSAxMS44LTEzLjEgMTEuNy0zMS05IDIuNS0yOC4zIDE0LjMtMzAgMjMuNiIgZmlsbD0iI2U5ZThlOCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTQ0IDQ2LjNjMC0zLS43LTUuNC0xLjUtNS40aC03Yy0uOCAwLTQgMy40LTQuMiA2LjJhNzc1IDc3NSAwIDAgMC0yLjggNTZjMCAxNi40IDEuMiAzMi45IDIuOCA1NiAwIDIuOSAzLjQgNi4zIDQuMiA2LjNoN2MuOCAwIDEuNC0yLjUgMS40LTUuNC0xLjItMTktMi4yLTM3LjgtMi4yLTU2LjlzLjUtMzcuOCAyLjItNTYuOCIgZmlsbD0iIzhkOGY5MyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTM1LjcgNDEuM2MtMiAuNi0zLjcgNC0zLjggNS44QzMwLjggNjMgMjkgNzkuNCAyOSA5NS40Yy0uNiAyMS4yIDEuMyA0Mi42IDIuOCA2My43LjQgMS44IDIgNS4yIDMuNyA1LjhoN2MxLjgtMy41LjctMTAgLjQtMTMuOC0xLTE4LjItMi4xLTM2LjgtMS42LTU1LjEgMC0xNi42LjktMzMuMyAyLjItNDkuOGExMiAxMiAwIDAgMC0xLTVoLTYuOE00MzAuNSAzMi4xbDUtMTEuNy00MS43IDIuMmMtMi45LjEtNS45LjUtOC44IDEuMy01IDEuMi00LjYgMi42LTYgOCAwIDEuMSA3LjUgMS41IDguNCAxLjUgMTQuNCAwIDI4LjguMiA0My4xLTEuM205LjctMTJsLTQuOCAxMS4zYzExLTEuNiAyMi4zLTIuNSAzMi45LTUuMyAzLjQtMS4xIDIuNC0yLjIgMi4yLTYtLjgtMS04LjItMS05LjMtMWwtMjEgMSIgZmlsbD0iI2QyZDJkMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTQ3MS4zIDE5LjNjMS4yIDAgMi41LS43IDQuMS0yLjYgMi45LTIuOCAxLjQtNC40LjUtNy44LTEtMy41LS4yLTMtMi42LTYuNS0xLjUtMi4xLTMuMS0yLjQtNS44LTIuNC0xLjIgMC0yLjYgMS4xLTIuMyAyLjVsMy43IDE0LjNjLjMgMS4yIDEgMi40IDIuNCAyLjQiIGZpbGw9IiM4ZDhmOTMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik01MzguMyAzNmMtMi0xMS4zIDYtMTggMTguMi03LjVhNDEgNDEgMCAwIDEgMTEuNyAzMS4xYy05LTIuNS0yOC4zLTE0LjItMzAtMjMuNiIgZmlsbD0iI2U5ZThlOCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTU2NS40IDE0My44YzEuNi0uNiAyLjUtMSAzLjQtMi42LjUtMSAxLjUtMi42IDEuNS01LjNhMTg5LjEgMTg5LjEgMCAwIDAgMC02NS4zYzAtMi43LTEtNC4zLTEuNS01LjNhNC41IDQuNSAwIDAgMC0zLjQtMi41IDE5NyAxOTcgMCAwIDEgNC41IDM5LjhjLjMgMTMuOS0yLjIgMjguOC00LjUgNDEuMyIgZmlsbD0iIzNiM2IzYyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHJlY3Qgcnk9IjguMSIgcng9IjguMSIgaGVpZ2h0PSIxNi4zIiB3aWR0aD0iMzEwLjYiIHk9IjIyIiB4PSI1My43IiBmaWxsPSIjZDJkMmQxIi8+PHBhdGggZD0iTTI5Ny41IDI3Ljh2NC43YzAgMy4zLjMgNi4xLjUgNmgxLjhjLjQgMCAuNS0yLjYuNS02di01YzAtMy4zLS4zLTYtLjUtNkgyOThjLS4yIDAtLjUgMi44LS41IDYuMW00MC4yLjVWMzNjMCAzLjMgMCA2IC41IDZoMS43Yy4zIDAgLjUtMi42LjUtNnYtNWMwLTMuMy0uMi02LS41LTZIMzM4YTIzIDIzIDAgMCAwLS4zIDYuMW0tNzkuMy0uMnY0LjdjMCAzLjEuMyA1LjkuNSA1LjloMS44Yy4yIDAgLjUtMi42LjUtNS45VjI4YzAtMy4zLS4zLTUuOS0uNS01LjloLTEuOGMtLjIgMC0uNSAyLjUtLjUgNS45bS00MC43LjF2NC44YzAgMy4yLjIgNS44LjUgNS44aDEuN2MuMyAwIC41LTIuNS41LTUuOVYyOGMwLTMuMy0uMi01LjktLjUtNS45aC0xLjZjLS4zIDAtLjUgMi42LS41IDUuOW0tNDAgMHY0LjhjMCAzLjIuMiA1LjguNSA1LjhoMS43Yy4zIDAgLjUtMi41LjUtNS45VjI4YzAtMy4zLS4yLTUuOS0uNS01LjloLTEuN2MtLjMgMC0uNSAyLjYtLjUgNS45bS00MCAwdjQuOGMwIDMuMi4yIDUuOC41IDUuOGgxLjdjLjMgMCAuNS0yLjUuNS01LjlWMjhjMC0zLjMtLjItNS45LS41LTUuOWgtMS43Yy0uMyAwLS41IDIuNi0uNSA1LjkiIGZpbGw9IiM4ZDhmOTMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxyZWN0IHJ5PSI4LjEiIHJ4PSI4LjEiIGhlaWdodD0iMTYuMyIgd2lkdGg9IjMxMS44IiB5PSIxNjkiIHg9IjUyLjUiIGZpbGw9IiNkMmQyZDEiLz48cGF0aCBkPSJNMjk3LjUgMTc0Ljh2NC44YzAgMy4zLjMgNi4yLjUgNmgxLjhjLjQgMCAuNS0yLjYuNS02di01YzAtMy4yLS4zLTYtLjUtNkgyOThjLS4yIDAtLjUgMi44LS41IDYuMm00MC4yLjJ2NWMwIDMuMyAwIDYgLjUgNmgxLjdjLjMgMCAuNS0yLjYuNS02di01YzAtMy4zLS4yLTYtLjUtNkgzMzhhMjMgMjMgMCAwIDAtLjMgNi4xbS03OS4zLS4ydjQuN2MwIDMuMi4zIDUuOS41IDUuOWgxLjhjLjIgMCAuNS0yLjYuNS01LjlWMTc1YzAtMy4zLS4zLTUuOS0uNS01LjloLTEuOGMtLjIgMC0uNSAyLjUtLjUgNS45bS00MC43LjF2NC44YzAgMy4yLjIgNS44LjUgNS44aDEuN2MuMyAwIC41LTIuNS41LTUuOFYxNzVjMC0zLjMtLjItNS45LS41LTUuOWgtMS42Yy0uMyAwLS41IDIuNy0uNSA1LjltLTQwIDB2NC44YzAgMy4yLjIgNS44LjUgNS44aDEuN2MuMyAwIC41LTIuNS41LTUuOFYxNzVjMC0zLjMtLjItNS45LS41LTUuOWgtMS43Yy0uMyAwLS41IDIuNy0uNSA1LjltLTQwIDB2NC44YzAgMy4yLjIgNS44LjUgNS44aDEuN2MuMyAwIC41LTIuNS41LTUuOFYxNzVjMC0zLjMtLjItNS45LS41LTUuOWgtMS43Yy0uMyAwLS41IDIuNy0uNSA1LjkiIGZpbGw9IiM4ZDhmOTMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
        scaledSize: new google.maps.Size(32, 14),
        labelOrigin: new google.maps.Point(16, 20),
      },
      title: shuttleData.properties.name,
      label: {
        color: '#333',
        fontWeight: 'bold',
        text: shuttleData.properties.name,
      },
      map: window.map,
    });
    return marker;
  }

  handleNewValue(shuttleSnapshot) {
    const shuttleData = shuttleSnapshot.val();
    if (!shuttleData.properties) return;
    const shuttleTimestamp = moment(shuttleData.properties.timestamp);
    const dataIsFresh = shuttleTimestamp.isAfter(moment().subtract(this.DATA_TIMEOUT, 'seconds'));
    const newShuttles = this.state.shuttles;
    newShuttles[shuttleSnapshot.key] = shuttleData;

    const tempShuttleMarkers = this.state.shuttleMarkers;
    /*
     * Check to see if this shuttle's marker hasn't been created yet. Possible if there are now more
     * records under this loop's object than there were previously.
     */
    if (!this.state.shuttleMarkers[shuttleSnapshot.key]) {
      tempShuttleMarkers[shuttleSnapshot.key] = this.constructMarker(shuttleSnapshot);
    }
    tempShuttleMarkers[shuttleSnapshot.key].setVisible(dataIsFresh);
    this.setState({
      shuttles: newShuttles,
      shuttleMarkers: tempShuttleMarkers
    });
  }

  componentDidMount() {
    const swBound = new google.maps.LatLng({ lat: 41.005188, lng: -76.452374 });
    const neBound = new google.maps.LatLng({ lat: 41.019014, lng: -76.443321 });
    const bounds = new google.maps.LatLngBounds(swBound, neBound);
    const mapStyles = [{
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' },
      ],
    }];
    window.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14,
      styles: mapStyles
    });
    window.map.fitBounds(bounds);

    const stationsRef = firebase.database().ref('bus-stations');
    
    stationsRef.once('value', (stationsSnapshot) => { 
      const stationsData = stationsSnapshot.val();
      const tempStationMarkers = {};
      stationsData.forEach((stationData, i) => {
        tempStationMarkers[stationData.properties.name] = new google.maps.Marker({
          position: {
            lat: stationData.geometry.coordinates[0],
            lng: stationData.geometry.coordinates[1],
          },
          icon: {
            url: './bus-stop.svg',
            anchor: new google.maps.Point(16,16),
            scaledSize: new google.maps.Size(32,32),
            labelOrigin: new google.maps.Point(16, 42),
          },
          title: stationData.properties.name,
          label: stationData.properties.name,
          map: window.map
        });
      });
      this.setState({
        stations: stationsData,
        stationMarkers: tempStationMarkers
      });
    });

    const shuttlesRef = firebase.database().ref('shuttles');

    shuttlesRef.on('value', (shuttlesSnapshot) => {
      shuttlesSnapshot.forEach((shuttleSnapshot) => { this.handleNewValue(shuttleSnapshot); });
    });

    shuttlesRef.on('child_changed', (shuttlesSnapshot) => {
      shuttlesSnapshot.forEach((shuttleSnapshot) => { this.handleNewValue(shuttleSnapshot); });
    });
  }

  componentDidUpdate() {
    if (this.state.selectedMarker) {
      window.map.setCenter(this.state.selectedMarker.getPosition());
    }
  }

  onStationSelect(stationName) {
    this.setState({
      selectedTab: '',
      selectedStation: this.state.stations[stationName],
      selectedMarker: this.state.stationMarkers[stationName],
    });
  }

  onShuttleSelect(loopKey) {
    this.setState({
      selectedTab: '',
      selectedShuttle: loopKey,
      selectedMarker: this.state.shuttleMarkers[loopKey],
    });
  }

  render() {
    return (
      <StationsContext.Provider value={{
        selectedStation: this.state.selectedStation,
        selectedMarker: this.state.selectedMarker,
        stations: this.state.stations,
        stationMarkers: this.state.stationMarkers,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <header>
            <img src="./bloombus-logo.svg" alt="Shuttle Icon"></img>
          </header>
          <StationsDrawer isOpen={this.state.selectedTab === 'stationsTab'} onSelect={this.onStationSelect}/>
          <ShuttlesDrawer shuttles={this.state.shuttles} isOpen={this.state.selectedTab === 'shuttlesTab'} onSelect={this.onShuttleSelect}/>
          <div id="map"></div>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            style={{ height: '60px' }}>
            <TabBar.Item
              title="Stations"
              key="Stations"
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./bus-stop-o.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./bus-stop.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selected={this.state.selectedTab === 'stationsTab'}
              onPress={() => {
                this.setState({
                  selectedTab: this.state.selectedTab === 'stationsTab' ? '' : 'stationsTab'
                })
              }}>
            </TabBar.Item>
            <TabBar.Item
              title="Shuttles"
              key="Shuttles"
              icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./shuttle-o.svg) center center /  21px 21px no-repeat' }}
                />}
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./shuttle.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selected={this.state.selectedTab === 'shuttlesTab'}
              onPress={() => {
                this.setState({
                  selectedTab: this.state.selectedTab === 'shuttlesTab' ? '' : 'shuttlesTab'
                });
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              title="About"
              key="About"
              icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./info-o.svg) center center /  21px 21px no-repeat' }}
                />}
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(./info.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selected={this.state.selectedTab === 'aboutTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'aboutTab'
                });
              }}
            >
            </TabBar.Item>
          </TabBar>
        </div>
      </StationsContext.Provider>
    )
  }
}

export default Home;