import { Feature, LineString, Point } from 'geojson';

export type StopKey =
  | 'library'
  | 'nelsonFieldHouse'
  | 'jka'
  | 'orangeLot'
  | 'moa'
  | 'mpa';

export type LoopKey =
  | 'campus'
  | 'downtown'
  | 'honeysuckle'
  | 'latenight'
  | 'walmart';

export type Loop = Feature<
  LineString,
  {
    color: string;
    key: LoopKey;
    name: string;
    shapeLength: number;
    stops: StopKey[];
  }
>;

export type Stop = Feature<
  Point,
  {
    stopKey: StopKey;
    color: string;
    name: string;
    imageURL: string;
  }
>;

export type Stops = {
  [K in StopKey]: Stop;
};

export type LoopStops = {
  [K in LoopKey]: StopKey[];
};

export type Shuttle = Feature<
  Point,
  {
    loopKey: LoopKey;
    loopDisplayName: string;
    bearing: number;
  }
>;

export type Shuttles = {
  [guid: string]: Shuttle;
};

export interface Constants {
  mapOptions: {
    maxZoom: number;
    minZoom: number;
    nwBound: { latitude: number; longitude: number };
    seBound: { latitude: number; longitude: number };
  };
  reapShuttleThresholdMilliseconds: number;
  shuttleSpeedThresholdMetersPerSec: number;
  stopProximityThresholdMeters: number;
}

export type ContributionArea =
  | 'ai'
  | 'business'
  | 'financial'
  | 'database'
  | 'design'
  | 'doc'
  | 'hardware'
  | 'infra'
  | 'mobile'
  | 'networking'
  | 'projectManagement'
  | 'research'
  | 'web';

export interface Contributor {
  /* Contributor's name */
  name: string;
  /* Avatar URL */
  avatar: string;
  /* Contribution areas that the contributor participated in */
  contributionAreas: ContributionArea[];
  /* Custom descriptions of primary contributions */
  contributions: string[];
}
