// Framework and third-party non-ui
import React from 'react';
import { useParams } from 'react-router-dom';
import { keyBy } from 'lodash';
import { distance, point, Position } from '@turf/turf';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StyledStopInfoCard,
  StopImage,
  LoopBadge,
  DistanceLabel
} from './StopInfoCard-styled';

// App components, types
import { Loop, LoopKey, LoopStops, Stop, StopKey, Stops } from 'types';

// Third-party components (buttons, icons, etc.)
import { CardTitle, CardContent } from 'calcite-react/Card';

interface StopInfoCardProps {
  stops: Stops;
  loopStops: LoopStops;
  loops: Loop[];
  userLocation: Position | null;
}
const StopInfoCard: React.FC<StopInfoCardProps> = ({
  stops,
  loopStops,
  loops,
  userLocation
}) => {
  const { stopKey } = useParams<{ stopKey: StopKey }>();

  const stop = stops[stopKey];
  const { name, imageURL } = stop.properties;

  const loopKeysThatStopHere = Object.keys(loopStops).filter((loopKey) =>
    loopStops[loopKey as LoopKey].includes(stopKey)
  );

  const getDistanceLabel = (stop: Stop) => {
    if (!userLocation) return null;
    const from = point(userLocation);
    const to = point(stop.geometry.coordinates);
    const dist = distance(from, to, { units: 'miles' });
    return `${dist.toFixed(1)} mi`;
  };

  const loopBadges = loopKeysThatStopHere.map((loopKey) => {
    const loop = keyBy(loops, 'properties.key')[loopKey];
    return loop ? (
      <LoopBadge key={loopKey} color={loop.properties.color}>
        {loop.properties.name.replace('Loop', '').trim()}
      </LoopBadge>
    ) : null;
  });

  return (
    <StyledStopInfoCard wide>
      <StopImage src={imageURL} />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        {loopBadges}
        <div>
          {userLocation ? (
            <DistanceLabel>{getDistanceLabel(stop)}</DistanceLabel>
          ) : null}
        </div>
      </CardContent>
    </StyledStopInfoCard>
  );
};

export default StopInfoCard;
