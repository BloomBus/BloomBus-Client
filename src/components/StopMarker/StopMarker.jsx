import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

import { StopMarkerContainer } from './StopMarker-styled';

class StopMarker extends PureComponent {
  render() {
    const {
      stop, selected, disabled, onStopSelect,
    } = this.props;
    const fill = selected ? '#3cd3ab' : '#33a3f4';
    const [longitude, latitude] = stop.geometry.coordinates;
    return (
      <Marker
        longitude={longitude}
        latitude={latitude}
        className={`stop-marker ${selected ? 'stop-marker--selected' : ''}`}
      >
        <StopMarkerContainer selected={selected} onClick={() => !disabled && onStopSelect(stop.properties.stopKey)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="1.5"
            clipRule="evenodd"
            viewBox="0 0 93 93"
            style={disabled ? { filter: 'opacity(0.3) saturate(0.75)' } : null}
          >
            <ellipse cx="46.08" cy="83.54" fill="url(#_Radial1)" rx="32.32" ry="8.62" />
            <circle cx="46.05" cy="80.25" r="5.34" fill={fill} />
            <path fill={fill} d="M40.64 24.38h10.75v55.88H40.64z" />
            <circle cx="46.05" cy="32.39" r="27.57" fill={fill} />
            <circle cx="46.01" cy="32.39" r="21.89" fill="#fff" />
            <clipPath id="a">
              <path d="M31.46 17.12h29.25v30.54H31.46z" />
            </clipPath>
            <g clipPath="url(#a)">
              <path
                fill="#fff"
                stroke={fill}
                strokeWidth="1.72"
                d="M40.5 41.75a2.42 2.42 0 0 0-4.84 0v2.48a2.42 2.42 0 0 0 4.84 0v-2.48zM56.2 41.75a2.42 2.42 0 0 0-4.85 0v2.48a2.42 2.42 0 0 0 4.84 0v-2.48z"
              />
              <path
                fill={fill}
                d="M58.3 22.25c0-1.3-1.06-2.35-2.36-2.35H35.88a2.36 2.36 0 0 0-2.35 2.35V41.1c0 1.3 1.05 2.36 2.35 2.36h20.06c1.3 0 2.36-1.06 2.36-2.36V22.25z"
              />
              <ellipse cx="45.95" cy="22.27" fill="#fff" stroke={fill} strokeWidth="2.15" rx="11.28" ry="4.07" />
              <path
                fill={fill}
                d="M60.44 25.73c0-1.23-1-2.23-2.23-2.23H33.69c-1.23 0-2.23 1-2.23 2.23v4.47c0 1.23 1 2.23 2.23 2.23H58.2c1.23 0 2.23-1 2.23-2.23v-4.47z"
              />
              <path
                fill="#fff"
                d="M58.3 26.96c0-.62-.5-1.12-1.12-1.12H34.65c-.62 0-1.12.5-1.12 1.12v2.24c0 .62.5 1.12 1.12 1.12h22.53c.62 0 1.12-.5 1.12-1.12v-2.24z"
              />
              <path
                fill="#fff"
                d="M56.2 22.51a1 1 0 0 0-1-.99H36.65a1 1 0 0 0-1 1v17.9a1 1 0 0 0 1 .98H55.2a1 1 0 0 0 1-.99v-17.9z"
              />
              <path
                fill="none"
                stroke={fill}
                strokeWidth="1.72"
                d="M53.15 26.25a2.75 2.75 0 0 0-2.74-2.75h-8.74a2.75 2.75 0 0 0-2.75 2.75v2.82a2.75 2.75 0 0 0 2.75 2.75h8.74a2.74 2.74 0 0 0 2.74-2.75v-2.82z"
              />
              <circle cx="40.02" cy="36.99" r="1.31" fill="#ffd800" />
              <circle cx="51.59" cy="36.99" r="1.31" fill="#ffd800" />
            </g>
            <defs>
              <radialGradient
                id="_Radial1"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="matrix(-31.9792 0 0 -9.17314 45.8 83.76)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#d4ddef" />
                <stop offset=".61" stopColor="#d4ddef" stopOpacity=".83" />
                <stop offset=".82" stopColor="#d4ddef" stopOpacity=".43" />
                <stop offset="1" stopColor="#d4ddef" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </StopMarkerContainer>
      </Marker>
    );
  }
}

StopMarker.defaultProps = {
  selected: false,
  isInteracting: false,
};

export default StopMarker;
