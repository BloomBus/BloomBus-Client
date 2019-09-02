// Framework and third-party non-ui
import React, { Component } from 'react';
import { fromJS } from 'immutable';

// Component specific modules (Component-styled, etc.)
import CustomMapController from './CustomMapController';

// App components
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import StopMarker from '../StopMarker';
import ShuttleMarker from '../ShuttleMarker';

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
      isInteracting={props.isInteracting}
    />
  );
}));

class Map extends Component {
  state = {
    mapStyle: null,
    isInteracting: false,
  };

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

  onInteractionStateChange = (interactionState) => {
    const { isPanning, isDragging, isZooming } = interactionState;
    this.setState({
      isInteracting: isPanning || isDragging || isZooming,
    });
  };

  render() {
    const { maxZoom, minZoom } = this.props.mapOptions;
    return (
      <div ref={this.props.mapContainerRef} style={{ flex: 1 }}>
        <ReactMapGL
          {...this.props.viewport}
          mapStyle={this.state.mapStyle}
          controller={new CustomMapController()}
          onInteractionStateChange={this.onInteractionStateChange}
          onViewportChange={this.props.onViewportChange}
          onClick={this.props.onMapClick}
          minZoom={minZoom}
          maxZoom={maxZoom}
          width="100%"
          height="100%"
        >
          <GeolocateControl
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          <StopMarkerLayer
            stops={this.props.stops}
            selectedStop={this.props.selectedStop}
            onStopSelect={this.props.onStopSelect}
            isInteracting={this.state.isInteracting}
          />
          {Object.keys(this.props.shuttles).map((shuttleKey) => {
            const shuttle = this.props.shuttles[shuttleKey];
            return (
              <ShuttleMarker
                shuttle={shuttle}
                key={shuttleKey}
                shuttleKey={shuttleKey} // must explicitly pass as separate prop
                loops={this.props.loops}
                isInteracting={this.state.isInteracting}
                onShuttleSelect={this.props.onShuttleSelect}
              />
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

Map.defaultProps = {
  stops: {},
  shuttles: {},
  mapOptions: {},
};

export default Map;
