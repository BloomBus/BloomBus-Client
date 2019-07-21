// Framework and third-party non-ui
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

// Component specific modules (Component-styled, etc.)

// App components
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import StopMarker from './StopMarker';
import ShuttleMarker from './ShuttleMarker';
import geoJSONFeatureShape from '../utils/geoJSONFeatureShape';

// Third-party components (buttons, icons, etc.)

// JSON

// CSS

const StopMarkerLayer = React.memo(props => Object.keys(props.stops).map((stopKey) => {
  const selected = props.selectedStop === stopKey;
  return (
    <StopMarker
      key={stopKey}
      stop={props.stops[stopKey]}
      selected={selected}
      onStopSelect={props.onStopSelect}
    />
  );
}));

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: null,
      isInteracting: false,
    };

    this.onInteractionStateChange = this.onInteractionStateChange.bind(this);
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

  onInteractionStateChange(interactionState) {
    const { isPanning, isDragging, isZooming } = interactionState;
    this.setState({
      isInteracting: isPanning || isDragging || isZooming,
    });
  }

  render() {
    const { maxZoom, minZoom } = this.props.mapOptions;
    return (
      <div ref={this.props.mapContainerRef} style={{ flex: 1 }}>
        <ReactMapGL
          {...this.props.viewport}
          mapStyle={this.state.mapStyle}
          onInteractionStateChange={this.onInteractionStateChange}
          onViewportChange={this.props.onViewportChange}
          onClick={this.props.onMapClick}
          minZoom={minZoom}
          maxZoom={maxZoom}
        >
          <GeolocateControl
            style={{
              position: 'absolute',
              left: '10px',
              top: '10px',
            }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          <StopMarkerLayer
            stops={this.props.stops}
            selectedStop={this.props.selectedStop}
            onStopSelect={this.props.onStopSelect}
          />
          {Object.keys(this.props.shuttles).map((shuttleKey) => {
            const shuttle = this.props.shuttles[shuttleKey];
            return (
              <ShuttleMarker
                shuttle={shuttle}
                key={shuttleKey}
                loops={this.props.loops}
                isInteracting={this.state.isInteracting}
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
    stopKey: geoJSONFeatureShape,
  }),
  shuttles: PropTypes.shape({
    shuttleKey: geoJSONFeatureShape,
  }),
  selectedStop: PropTypes.string.isRequired,
  mapContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  mapOptions: PropTypes.shape({
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    nwBound: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    seBound: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  viewport: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
  }).isRequired,
  onViewportChange: PropTypes.func.isRequired,
};

Map.defaultProps = {
  stops: {},
  shuttles: {},
  mapOptions: {},
};

export default Map;
