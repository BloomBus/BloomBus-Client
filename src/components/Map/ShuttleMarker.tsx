import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import TinyColor from '@ctrl/tinycolor';

import { getLoopByKey } from 'utils/helpers';
import { Loop, Shuttle } from 'types';

interface ShuttleMarkerContainerProps {
  bearing: number;
}
const ShuttleMarkerContainer = styled.div.attrs<ShuttleMarkerContainerProps>(
  ({ bearing }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${bearing + 90}deg)`
    }
  })
)<ShuttleMarkerContainerProps>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    filter: drop-shadow(1px -1px 4px rgba(0, 0, 0, 0.7));
  }
`;

interface ShuttleMarkerProps {
  shuttleKey: string;
  shuttle: Shuttle;
  loops: Loop[];
  isInteracting: boolean;
}
const ShuttleMarker: React.FC<ShuttleMarkerProps> = ({
  shuttleKey,
  shuttle,
  loops,
  isInteracting
}) => {
  const [longitude, latitude] = shuttle.geometry.coordinates;
  const { bearing, loopKey } = shuttle.properties;

  const history = useHistory();

  const loop = getLoopByKey(loopKey, loops);
  if (!loop) throw Error();
  const fill = TinyColor(loop.properties.color);
  const darker = fill.darken(30);

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      className={`shuttle-marker ${
        isInteracting ? '' : 'shuttle-marker--not-interacting'
      }`}
    >
      <ShuttleMarkerContainer
        bearing={bearing}
        onClick={() => history.push(`/shuttle/${shuttleKey}`)}
      >
        <svg viewBox="0 0 42 42" height="40" width="40">
          <path
            fill={fill.toHex8String()}
            d="M42.04 14.05a.77.77 0 0 0-.77-.77H3.28a3.24 3.24 0 0 0-3.24 3.24v8.95a3.24 3.24 0 0 0 3.24 3.25h38c.42 0 .76-.35.76-.78V14.05z"
          />
          <path
            fill={darker.toHex8String()}
            d="M40.06 15.97c0-.31-.25-.56-.56-.56H4.69c-1.23 0-2.24 1-2.24 2.24v6.7c0 1.24 1 2.24 2.24 2.24h34.8c.32 0 .57-.25.57-.56V15.97z"
          />
          <path
            fill={fill.toHex8String()}
            d="M7.1 13.67h.07l.06.02.07.02.06.02.06.03.06.03.05.04.06.04.04.05.05.05.04.05.04.05.03.06.03.06.02.07.02.06.01.07.01.06V27.82l-.02.06-.02.07-.02.06-.03.06-.03.06-.04.06-.04.05-.04.05-.05.04-.06.04-.05.04-.06.03-.06.03-.06.02-.07.02-.06.02H6.9l-.07-.02-.06-.02-.06-.02-.06-.03-.06-.03-.06-.04-.05-.04-.05-.04-.04-.05-.04-.05-.04-.06-.03-.06-.03-.06-.02-.06-.02-.07-.02-.06V14.39l.02-.07.02-.06.02-.07.03-.06.03-.06.04-.05.04-.05.04-.05.05-.05.05-.04.06-.04.06-.03.06-.03.06-.02.07-.02.06-.01h.07l.06-.01h.07z"
          />
          <path
            fill={darker.toHex8String()}
            d="M31.52 12.52h3.09v.82h-3.09zM31.47 28.72h3.09v.82h-3.09zM3.99 12.46h3.09v.82H3.99zM3.93 28.72h3.09v.82H3.93zM36.34 12.46h3.09v.82h-3.09zM36.34 28.72h3.09v.82h-3.09z"
          />
        </svg>
      </ShuttleMarkerContainer>
    </Marker>
  );
};

export default ShuttleMarker;
