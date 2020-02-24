/* globals GeolocationCoordinates */

// Framework and third-party non-ui
import React, { useEffect, useRef, useState } from 'react';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { bbox, lineString } from '@turf/turf';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';

// Local helpers/utils/modules
import { getLoop } from '../../utils/functions';
import firebase from '../../utils/firebase';

// Component specific modules (Component-styled, etc.)
import { StyledHeaderLogoLabel, StyledLoaderWrapper } from './Home-styled';
import {
  LeftHeader,
  CenterHeader,
  RightHeader
} from '../AppHeader/AppHeader-styled';

// App components
import LoopsBottomSheet from '../LoopsBottomSheet';
import LoopStopsBottomSheet from '../LoopStopsBottomSheet';
import StopInfoCard from '../StopInfoCard';
import ShuttleBottomSheet from '../ShuttleBottomSheet';
import Map from '../Map';
import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';
import OverflowMenu from '../OverflowMenu';

// Third-party components (buttons, icons, etc.)
import Loader from 'calcite-react/Loader';
import Modal from 'calcite-react/Modal';
import Button from 'calcite-react/Button';
import { CalciteP } from 'calcite-react/Elements';
import LogoBusIcon from './LogoBusIcon';

// JSON

// CSS

const Home = () => {
  // State
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 41.007,
    longitude: -76.451,
    zoom: 14,
    pitch: 0,
    tilt: 0
  });
  const [showOutOfBoundsModal, setShowOutOfBoundsModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const mapContainerRef = useRef();

  // Firebase values
  const db = firebase.database();
  const [constants, constantsLoading] = useObjectVal(db.ref('constants'));
  const [shuttles, shuttlesLoading] = useObjectVal(db.ref('shuttles'));
  const [stops, stopsLoading] = useObjectVal(db.ref('stops'));
  const [loops, loopsLoading] = useObjectVal(db.ref('loops/features'));
  const [loopStops, loopStopsLoading] = useObjectVal(db.ref('loop-stops'));
  const isLoading =
    constantsLoading ||
    shuttlesLoading ||
    stopsLoading ||
    loopsLoading ||
    loopStopsLoading;

  // react-router props
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  // Process a shuttle update
  useEffect(() => {
    // Track selected shuttle
    const { shuttleID } = params;
    if (shuttleID) {
      // Get selected shuttle by its UUID
      const selectedShuttle = shuttles[shuttleID];
      const [longitude, latitude] = selectedShuttle.geometry.coordinates;
      setViewport({
        ...viewport,
        longitude,
        latitude,
        transitionDuration: 1000,
        transitionInterpolator: new LinearInterpolator()
      });
    }
  }, [params, shuttles, viewport]);

  // Redirect to /loops on mount
  useEffect(() => {
    history.push('/loops');
  }, [history]);

  const onStopSelect = stopKey => {
    const [longitude, latitude] = stops[stopKey].geometry.coordinates;
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom: 16,
      transitionInterpolator: new LinearInterpolator(),
      transitionDuration: 200
    });
    history.push(`/stop/${stopKey}`);
  };

  const onShuttleSelect = shuttleKey => {
    const [longitude, latitude] = shuttles[shuttleKey].geometry.coordinates;

    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom: 16,
      transitionInterpolator: new LinearInterpolator(),
      transitionDuration: 200
    });

    history.push(`/shuttle/${shuttleKey}`);
  };

  const onLoopSelect = loopKey => {
    const loop = getLoop(loopKey, loops);
    if (loop === undefined) return;
    const line = lineString(loop.geometry.coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);
    // construct a viewport instance from the current state
    const newViewport = new WebMercatorViewport(viewport);
    const { longitude, latitude, zoom } = newViewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat]
      ],
      {
        padding: 40
      }
    );

    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 500
    });

    history.push(`/loop/${loopKey}`);
  };

  const onViewportChange = viewport => {
    const newViewport = {
      ...viewport
    };
    const { nwBound, seBound } = constants.mapOptions;
    // Clamp viewport bounds
    if (viewport.longitude < nwBound.longitude) {
      newViewport.longitude = nwBound.longitude;
    } else if (viewport.longitude > seBound.longitude) {
      newViewport.longitude = seBound.longitude;
    }
    if (viewport.latitude > nwBound.latitude) {
      newViewport.latitude = nwBound.latitude;
    } else if (viewport.latitude < seBound.latitude) {
      newViewport.latitude = seBound.latitude;
    }

    setViewport(newViewport);
  };

  const onMapClick = pointerEvent => {
    const { pathname } = location;
    history.push(pathname !== '/' ? '/' : '/loops');
  };

  const onGeolocate = data => {
    if (
      data.hasOwnProperty('coords') &&
      data.coords instanceof GeolocationCoordinates
    ) {
      const { nwBound, seBound } = constants.mapOptions;
      const { latitude, longitude } = data.coords;
      const outOfBounds =
        latitude > nwBound.latitude ||
        longitude < nwBound.longitude ||
        latitude < seBound.latitude ||
        longitude > seBound.longitude;

      setUserLocation([longitude, latitude]);
      setShowOutOfBoundsModal(outOfBounds);
    }
  };

  // Fires when a bottomsheet opens/closes
  const onBottomSheetChange = isOpen => {
    if (isOpen) return;
    history.push('/');
  };

  return isLoading ? (
    <StyledLoaderWrapper>
      <Loader text="Loading..." />
    </StyledLoaderWrapper>
  ) : (
    <>
      <AppHeader>
        <LeftHeader />
        <CenterHeader>
          <StyledHeaderLogoLabel>BloomBus</StyledHeaderLogoLabel>
          <LogoBusIcon />
        </CenterHeader>
        <RightHeader>
          <OverflowMenu />
        </RightHeader>
      </AppHeader>
      <Route path={['/stop/:stopKey', '/loop/:loopKey', '/']}>
        <Map
          mapContainerRef={mapContainerRef}
          loops={loops}
          stops={stops}
          loopStops={loopStops}
          shuttles={shuttles}
          mapOptions={constants.mapOptions}
          viewport={viewport}
          onViewportChange={onViewportChange}
          onMapClick={onMapClick}
          onStopSelect={onStopSelect}
          onShuttleSelect={onShuttleSelect}
          onGeolocate={onGeolocate}
        />
      </Route>
      <BrowserView>
        <Sidebar
          loops={loops}
          stops={stops}
          loopStops={loopStops}
          shuttles={shuttles}
          onLoopSelect={onLoopSelect}
          onStopSelect={onStopSelect}
          onShuttleSelect={onShuttleSelect}
        />
      </BrowserView>
      <MobileView>
        <Switch>
          <Route exact path="/loops">
            {loops && (
              <LoopsBottomSheet
                loops={loops}
                stops={stops}
                shuttles={shuttles}
                onLoopSelect={onLoopSelect}
                onBottomSheetChange={onBottomSheetChange}
              />
            )}
          </Route>
          <Route path="/loop/:loopKey">
            <LoopStopsBottomSheet
              loopStops={loopStops}
              stops={stops}
              onStopSelect={onStopSelect}
              onBottomSheetChange={onBottomSheetChange}
            />
          </Route>
          <Route path="/stop/:stopKey">
            <StopInfoCard
              stops={stops}
              loopStops={loopStops}
              loops={loops}
              userLocation={userLocation}
            />
          </Route>
          <Route path="/shuttle/:shuttleID">
            <ShuttleBottomSheet
              shuttles={shuttles}
              onBottomSheetChange={onBottomSheetChange}
            />
          </Route>
        </Switch>
      </MobileView>
      <Modal
        open={showOutOfBoundsModal}
        onRequestClose={() => setShowOutOfBoundsModal(false)}
        appElement={document.body}
        title="Out of Boundaries"
        actions={[
          <Button key="dismiss" onClick={() => setShowOutOfBoundsModal(false)}>
            Dismiss
          </Button>
        ]}
      >
        <CalciteP>
          Sorry, your current location is outside of the region supported by
          this app. Please deactivate the location tracking button.
        </CalciteP>
      </Modal>
    </>
  );
};

export default Home;
