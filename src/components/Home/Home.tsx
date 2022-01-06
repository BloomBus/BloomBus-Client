// Framework and third-party non-ui
import React, { useEffect, useRef, useState } from 'react';
import {
  FlyToInterpolator,
  LinearInterpolator,
  ViewportProps
} from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { bbox, lineString, Position } from '@turf/turf';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';
import { isEqual } from 'lodash';

// Local helpers/utils/modules
import { getLoopByKey } from 'utils/helpers';
import firebase from 'utils/firebase';

// Component specific modules (Component-styled, etc.)
import { StyledHeaderLogoLabel, StyledLoaderWrapper } from './Home-styled';
import {
  LeftHeader,
  CenterHeader,
  RightHeader
} from 'components/AppHeader/AppHeader-styled';

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
import LoopsBottomSheet from 'components/LoopsBottomSheet';
import LoopStopsBottomSheet from 'components/LoopStopsBottomSheet';
import StopInfoCard from 'components/StopInfoCard';
import ShuttleBottomSheet from 'components/ShuttleBottomSheet';
import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import AppHeader from 'components/AppHeader';
import OverflowMenu from 'components/OverflowMenu';

// Third-party components (buttons, icons, etc.)
import Loader from 'calcite-react/Loader';
import Modal from 'calcite-react/Modal';
import Button from 'calcite-react/Button';
import { CalciteP } from 'calcite-react/Elements';
import LogoBusIcon from './LogoBusIcon';

const initialViewport = {
  width: 100,
  height: 100,
  latitude: 41.007,
  longitude: -76.451,
  zoom: 14,
  pitch: 0,
  tilt: 0
};

const db = firebase.database();

const Home = () => {
  // State
  const [viewport, setViewport] =
    useState<Partial<ViewportProps>>(initialViewport);
  const [showOutOfBoundsModal, setShowOutOfBoundsModal] = useState(false);
  const [userLocation, setUserLocation] = useState<Position | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Firebase values
  const [constants, constantsLoading] = useObjectVal<Constants>(
    db.ref('constants')
  );
  const [shuttles, shuttlesLoading] = useObjectVal<Shuttles>(
    db.ref('shuttles')
  );
  const [stops, stopsLoading] = useObjectVal<Stops>(db.ref('stops'));
  const [loops, loopsLoading] = useObjectVal<Loop[]>(db.ref('loops/features'));
  const [loopStops, loopStopsLoading] = useObjectVal<LoopStops>(
    db.ref('loop-stops')
  );

  const isLoading =
    constantsLoading ||
    !constants ||
    shuttlesLoading ||
    stopsLoading ||
    !stops ||
    loopsLoading ||
    !loops ||
    loopStopsLoading ||
    !loopStops;

  // react-router props
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ shuttleID: string }>();

  //Process a shuttle update
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // Track selected shuttle
    if (shuttlesLoading || !shuttles) return;
    const { shuttleID } = params;
    if (shuttleID) {
      // Get selected shuttle by its UUID
      const selectedShuttle = shuttles[shuttleID];
      if (!selectedShuttle) return;
      const [longitude, latitude] = selectedShuttle.geometry.coordinates;
      setViewport({
        ...viewport,
        longitude,
        latitude,
        transitionDuration: 1000,
        transitionInterpolator: new LinearInterpolator()
      });
    }
  }, [shuttles]);

  const onStopSelect = (stopKey: StopKey) => {
    if (!stops) return;
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

  const onLoopSelect = (loopKey: LoopKey) => {
    if (!loops) throw Error();
    const loop = getLoopByKey(loopKey, loops);
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

  const onViewportChange = (newViewport: ViewportProps) => {
    if (!constants || !newViewport.latitude || !newViewport.longitude) return;
    const { nwBound, seBound } = constants.mapOptions;
    // Clamp viewport bounds
    if (newViewport.longitude < nwBound.longitude) {
      newViewport.longitude = nwBound.longitude;
    } else if (newViewport.longitude > seBound.longitude) {
      newViewport.longitude = seBound.longitude;
    }
    if (newViewport.latitude > nwBound.latitude) {
      newViewport.latitude = nwBound.latitude;
    } else if (newViewport.latitude < seBound.latitude) {
      newViewport.latitude = seBound.latitude;
    }

    if (!isEqual(viewport, newViewport)) {
      setViewport(newViewport);
    }
  };

  const onMapClick = () => {
    const { pathname } = location;
    history.push(pathname !== '/' ? '/' : '/loops');
  };

  const onGeolocate = (position: GeolocationPosition) => {
    if (!constants) throw Error();
    const { nwBound, seBound } = constants.mapOptions;
    const { latitude, longitude } = position.coords;
    const outOfBounds =
      latitude > nwBound.latitude ||
      longitude < nwBound.longitude ||
      latitude < seBound.latitude ||
      longitude > seBound.longitude;

    setUserLocation([longitude, latitude]);
    setShowOutOfBoundsModal(outOfBounds);
  };

  // Fires when a bottomsheet opens/closes
  const onBottomSheetChange = (open: boolean) => {
    if (open) return;
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
          loops={loops}
          loopStops={loopStops}
          mapContainerRef={mapContainerRef}
          mapOptions={constants.mapOptions}
          shuttles={shuttles}
          stops={stops}
          viewport={viewport}
          onGeolocate={onGeolocate}
          onMapClick={onMapClick}
          onStopSelect={onStopSelect}
          onViewportChange={onViewportChange}
        />
      </Route>
      <BrowserView>
        <Sidebar
          loops={loops}
          stops={stops}
          loopStops={loopStops}
          shuttles={shuttles}
          onStopSelect={onStopSelect}
        />
      </BrowserView>
      <MobileView>
        <Switch>
          <Route exact path="/loops">
            {loops && (
              <LoopsBottomSheet
                loops={loops}
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
              shuttles={shuttles!}
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
