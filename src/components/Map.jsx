// Framework and third-party non-ui
import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";

// Component specific modules (Component-styled, etc.)

// App components
import ReactMapGL, {
  Marker,
  GeolocateControl,
  FlyToInterpolator
} from "react-map-gl";
import StopMarker from "./StopMarker";
import ShuttleMarker from "./ShuttleMarker";
import geoJSONFeatureShape from "../utils/geoJSONFeatureShape";
import { getLoop } from "../utils/functions";

// Third-party components (buttons, icons, etc.)

// JSON

// CSS

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: null
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_MAPSTYLE_URL)
      .then(res => res.json())
      .then(json => {
        const mapStyle = json;
        mapStyle.sources.loops = {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.props.loops
          }
        };
        mapStyle.layers.push({
          id: "loops",
          type: "line",
          source: "loops",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-width": 3,
            "line-color": ["get", "color"]
          }
        });
        this.setState({
          mapStyle: fromJS(mapStyle)
        });
      });
  }

  render() {
    const { maxZoom, minZoom } = this.props.mapOptions;
    return (
      <div ref={this.props.mapContainerRef} style={{ flex: 1 }}>
        <ReactMapGL
          {...this.props.viewport}
          mapStyle={this.state.mapStyle}
          onViewportChange={this.props.onViewportChange}
          onClick={this.props.onMapClick}
          minZoom={minZoom}
          maxZoom={maxZoom}
          transitionDuration={300}
          transitionInterpolator={new FlyToInterpolator()}
        >
          <GeolocateControl
            style={{
              position: "absolute",
              left: "10px",
              top: "10px"
            }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          {Object.keys(this.props.stops).map(stopKey => {
            const [longitude, latitude] = this.props.stops[
              stopKey
            ].geometry.coordinates;
            return (
              <Marker key={stopKey} longitude={longitude} latitude={latitude}>
                <StopMarker />
              </Marker>
            );
          })}
          {Object.keys(this.props.shuttles).map(shuttleKey => {
            const shuttle = this.props.shuttles[shuttleKey];
            return (
              <ShuttleMarker
                shuttle={shuttle}
                key={shuttleKey}
                loops={this.props.loops}
              />
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

Map.propTypes = {
  loops: PropTypes.arrayOf(geoJSONFeatureShape).isRequired,
  stops: PropTypes.shape({
    stopKey: geoJSONFeatureShape
  }),
  shuttles: PropTypes.shape({
    shuttleKey: geoJSONFeatureShape
  }),
  mapContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  mapOptions: PropTypes.shape({
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    nwBound: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    }),
    seBound: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    })
  }),
  viewport: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired,
  onViewportChange: PropTypes.func.isRequired
};

Map.defaultProps = {
  stops: {},
  shuttles: {},
  mapOptions: {}
};

export default Map;
