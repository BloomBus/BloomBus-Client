// Framework and third-party non-ui
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

// Component specific modules (Component-styled, etc.)

// App components
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import StopMarker from './StopMarker';
import ShuttleMarker from './ShuttleMarker';

// Third-party components (buttons, icons, etc.)

// JSON

// CSS

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: '100%',
        height: '100%',
        latitude: 41.007,
        longitude: -76.451,
        zoom: 14,
        pitch: 0,
        tilt: 0,
      },
      mapStyle: null,
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_MAPSTYLE_URL)
      .then(res => res.json())
      .then((json) => {
        const mapStyle = json;
        mapStyle.sources.loops = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.props.loops,
          },
        };
        mapStyle.layers.push({
          id: 'loops',
          type: 'line',
          source: 'loops',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-width': 3,
            'line-color': ['get', 'color'],
          },
        });
        this.setState({
          mapStyle: fromJS(mapStyle),
        });
      });
  }

  render() {
    return (
      <div ref={this.props.mapContainerRef} style={{ flex: 1 }}>
        <ReactMapGL
          {...this.state.viewport}
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken="pk.eyJ1IjoiamdpYnNvbjAyIiwiYSI6ImNqeGR1aGYzZDBpNjYzeW1wNzI2YTdjZzAifQ.rTF7d_uy9-6mbk3g270BUQ"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          {Object.keys(this.props.stops).map((stopKey) => {
            const [longitude, latitude] = this.props.stops[
              stopKey
            ].geometry.coordinates;
            return (
              <Marker key={stopKey} longitude={longitude} latitude={latitude}>
                <StopMarker />
              </Marker>
            );
          })}
          {Object.keys(this.props.shuttles).map((shuttleKey) => {
            const shuttle = this.props.shuttles[shuttleKey];
            const [longitude, latitude] = shuttle.geometry.coordinates;
            const { bearing } = shuttle.properties;
            return (
              <Marker
                key={shuttleKey}
                longitude={longitude}
                latitude={latitude}
              >
                <ShuttleMarker bearing={bearing} />
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

Map.propTypes = {
  loops: PropTypes.array.isRequired,
  stops: PropTypes.object,
  shuttles: PropTypes.object,
  mapContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

Map.defaultProps = {
  stops: {},
  shuttles: {},
};

export default Map;
