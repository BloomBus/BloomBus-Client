// Framework and third-party non-ui
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fromJS } from 'immutable';

// Component specific modules (Component-styled, etc.)
import CustomMapController from './CustomMapController';
import {
  MapControlsWrapper,
  StyledGeolocateControl,
  StyledNavigationControl
} from './Map-styled';

// App components, types
import {
  Constants,
  Loop,
  LoopKey,
  LoopStops,
  Shuttles,
  StopKey,
  Stops
} from 'types';
import StopMarker from '../StopMarker';
import ShuttleMarker from './ShuttleMarker';

// Third-party components (buttons, icons, etc.)
import ReactMapGL, { ExtraState, ViewportProps } from 'react-map-gl';

interface StopMarkerLayerProps {
  isInteracting: boolean;
  selectedStop: StopKey;
  selectedLoopStops: LoopStops[LoopKey];
  stops: Stops;
  onStopSelect: (stopKey: StopKey) => void;
}
const StopMarkerLayer: React.FC<StopMarkerLayerProps> = ({
  selectedStop,
  selectedLoopStops,
  stops,
  onStopSelect
}) => {
  if (!stops) return null;
  return (
    <>
      {Object.entries(stops).map(([stopKey, stop]) => (
        <StopMarker
          key={stopKey}
          disabled={
            selectedLoopStops.length > 0 &&
            !selectedLoopStops.includes(stopKey as StopKey)
          }
          selected={selectedStop === stopKey}
          stop={stop}
          onStopSelect={onStopSelect}
        />
      ))}
    </>
  );
};

interface MapProps {
  loops: Loop[];
  loopStops: LoopStops;
  mapOptions: Constants['mapOptions'];
  mapContainerRef: React.RefObject<HTMLDivElement>;
  shuttles: Shuttles | undefined;
  stops: Stops;
  viewport: Partial<ViewportProps>;
  onGeolocate: (position: GeolocationPosition) => void;
  onMapClick: () => void;
  onStopSelect: (stopKey: StopKey) => void;
  onViewportChange: (newViewport: ViewportProps) => void;
}
const Map: React.FC<MapProps> = ({
  loops,
  loopStops,
  mapOptions: { maxZoom, minZoom },
  mapContainerRef,
  shuttles,
  stops,
  viewport,
  onGeolocate,
  onMapClick,
  onStopSelect,
  onViewportChange
}) => {
  const [mapStyle, setMapStyle] = useState<object | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const { REACT_APP_MAPSTYLE_URL } = process.env;
    if (!REACT_APP_MAPSTYLE_URL) return;
    fetch(REACT_APP_MAPSTYLE_URL)
      .then((res) => res.json())
      .then((json) => {
        const mapStyle = json;

        // Add loops GeoJSON to map sources
        mapStyle.sources.loops = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: loops
          }
        };

        // Add a loops layer
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

        setMapStyle(fromJS(mapStyle));
      });
  }, [loops]);

  const onInteractionStateChange = ({
    isPanning,
    isDragging,
    isZooming
  }: ExtraState) => {
    setIsInteracting(!!(isPanning || isDragging || isZooming));
  };

  const { stopKey: selectedStopKey, loopKey: selectedLoopKey } =
    useParams<{ stopKey: StopKey; loopKey: LoopKey }>();

  const selectedLoopStops = loopStops[selectedLoopKey] ?? [];

  return (
    <div ref={mapContainerRef} style={{ flex: 1 }}>
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle === null ? undefined : mapStyle}
        controller={new CustomMapController()}
        onClick={onMapClick}
        minZoom={minZoom}
        maxZoom={maxZoom}
        width="100%"
        height="100%"
        onInteractionStateChange={onInteractionStateChange}
        onViewportChange={onViewportChange}
      >
        <MapControlsWrapper>
          <StyledGeolocateControl
            trackUserLocation
            showUserLocation
            positionOptions={{ enableHighAccuracy: true }}
            onGeolocate={onGeolocate as any}
          />
          <StyledNavigationControl showCompass showZoom />
        </MapControlsWrapper>
        <StopMarkerLayer
          stops={stops}
          selectedStop={selectedStopKey}
          selectedLoopStops={selectedLoopStops}
          onStopSelect={onStopSelect}
          isInteracting={isInteracting}
        />
        {shuttles &&
          Object.entries(shuttles).map(([shuttleKey, shuttle]) => (
            <ShuttleMarker
              shuttle={shuttle}
              key={shuttleKey}
              shuttleKey={shuttleKey} // must explicitly pass as separate prop from `key`
              loops={loops}
              isInteracting={isInteracting}
            />
          ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
