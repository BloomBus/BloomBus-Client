import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';

import { getLoop } from '../utils/functions';

const ShuttleMarkerContainer = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => `${props.bearing}deg`});
`;

const StyledShuttleMarker = styled.div`
  width: 10px;
  height: 20px;
  border-radius: 3px;
  border-top: 3px solid #232323;
  border-bottom: 1.5px solid #232323;
  border-left: 1.5px solid #232323;
  border-right: 1.5px solid #232323;
  background-color: ${props => props.loop.properties.color};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.5);
`;

class ShuttleMarker extends Component {
  onClick(pointerEvent) {}

  render() {
    const { shuttle, loops } = this.props;
    const [longitude, latitude] = shuttle.geometry.coordinates;
    const { bearing } = shuttle.properties;
    const loop = getLoop(shuttle.properties.loopKey, loops);
    return (
      <Marker
        longitude={longitude}
        latitude={latitude}
        captureClick
        onClick={this.onClick}
        className={this.props.isInteracting ? '' : 'shuttle-marker--not-interacting'}
        offsetTop={-21}
        offsetLeft={-21}
      >
        <ShuttleMarkerContainer bearing={bearing}>
          <StyledShuttleMarker loop={loop} />
        </ShuttleMarkerContainer>
      </Marker>
    );
  }
}

ShuttleMarker.defaultProps = {
  isInteracting: false,
};

ShuttleMarker.propTypes = {
  isInteracting: PropTypes.bool,
};

export default ShuttleMarker;
