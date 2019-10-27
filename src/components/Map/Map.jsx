// Framework and third-party non-ui
import React, { Component } from 'react';
import { fromJS } from 'immutable';

// Component specific modules (Component-styled, etc.)
import CustomMapController from './CustomMapController';
import { MapControlsWrapper, StyledGeolocateControl, StyledNavigationControl } from './Map-styled';

// App components
import StopMarker from '../StopMarker';
import ShuttleMarker from './ShuttleMarker';

// Third-party components (buttons, icons, etc.)
import ReactMapGL from 'react-map-gl';

// JSON

// CSS

const StopMarkerLayer = React.memo(props =>
  Object.keys(props.stops).map(stopKey => {
    const stop = props.stops[stopKey];
    const selected = props.selectedStop === stopKey;
    const disabled = props.selectedLoopStops.length > 0 && !props.selectedLoopStops.includes(stopKey);
    return (
      <StopMarker
        key={stopKey}
        stop={stop}
        selected={selected}
        disabled={disabled}
        onStopSelect={props.onStopSelect}
        isInteracting={props.isInteracting}
      />
    );
  })
);

class Map extends Component {
  state = {
    mapStyle: null,
    isInteracting: false
  };

  componentDidMount() {
    fetch(process.env.REACT_APP_MAPSTYLE_URL)
      .then(res => res.json())
      .then(json => {
        const mapStyle = json;
        mapStyle.sources.loops = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.props.loops
          }
        };
        mapStyle.layers.push({
          id: 'loops',
          type: 'line',
          source: 'loops',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-width': 3,
            'line-color': ['get', 'color']
          }
        });
        this.setState({
          mapStyle: fromJS(mapStyle)
        });
      });
  }

  onInteractionStateChange = interactionState => {
    const { isPanning, isDragging, isZooming } = interactionState;
    this.setState({
      isInteracting: isPanning || isDragging || isZooming
    });
  };

  render() {
    const {
      viewport,
      mapOptions,
      mapContainerRef,
      shuttles,
      loops,
      stops,
      selectedStop,
      selectedLoopStops,
      onViewportChange,
      onMapClick,
      onStopSelect,
      onShuttleSelect
    } = this.props;
    const { maxZoom, minZoom } = mapOptions;
    return (
      <div ref={mapContainerRef} style={{ flex: 1 }}>
        <ReactMapGL
          {...viewport}
          mapStyle={this.state.mapStyle}
          controller={new CustomMapController()}
          onInteractionStateChange={this.onInteractionStateChange}
          onViewportChange={onViewportChange}
          onClick={onMapClick}
          minZoom={minZoom}
          maxZoom={maxZoom}
          width="100%"
          height="100%"
        >
          <MapControlsWrapper>
            <StyledGeolocateControl trackUserLocation positionOptions={{ enableHighAccuracy: true }} />
            <StyledNavigationControl showCompass showZoom />
          </MapControlsWrapper>
          <StopMarkerLayer
            stops={stops}
            selectedStop={selectedStop}
            selectedLoopStops={selectedLoopStops}
            onStopSelect={onStopSelect}
            isInteracting={this.state.isInteracting}
          />
          {Object.keys(shuttles).map(shuttleKey => {
            const shuttle = shuttles[shuttleKey];
            return (
              <ShuttleMarker
                shuttle={shuttle}
                key={shuttleKey}
                shuttleKey={shuttleKey} // must explicitly pass as separate prop from `key`
                loops={loops}
                isInteracting={this.state.isInteracting}
                onShuttleSelect={onShuttleSelect}
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
  mapOptions: {}
};

export default Map;
