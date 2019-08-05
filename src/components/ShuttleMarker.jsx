import React, { Component } from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import TinyColor from '@ctrl/tinycolor';

import { getLoop } from '../utils/functions';

const ShuttleMarkerContainer = styled.div.attrs(props => ({
  style: {
    transform: `translate(-50%, -50%) rotate(${props.bearing + 90}deg)`,
  },
}))`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ShuttleMarker extends Component {
  onClick(pointerEvent) {}

  render() {
    const { shuttle, loops } = this.props;
    const [longitude, latitude] = shuttle.geometry.coordinates;
    const { bearing } = shuttle.properties;
    const fill = TinyColor(getLoop(shuttle.properties.loopKey, loops).properties.color);
    const darker = fill.darken(30);

    return (
      <Marker
        longitude={longitude}
        latitude={latitude}
        captureClick
        onClick={this.onClick}
        className={`shuttle-marker ${this.props.isInteracting ? '' : 'shuttle-marker--not-interacting'}`}
      >
        <ShuttleMarkerContainer bearing={bearing}>
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
  }
}

ShuttleMarker.defaultProps = {
  isInteracting: false,
};

export default ShuttleMarker;
