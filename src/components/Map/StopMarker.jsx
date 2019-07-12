import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BusStopSVG from '../../images/bus-stop-v2.svg';

const StopMarkerContainer = styled.div`
  width: 42px;
  height: 42px;
`;

class StopMarker extends Component {
  render() {
    return (
      <StopMarkerContainer>
        <img src={BusStopSVG} alt="Shuttle Marker" />
      </StopMarkerContainer>
    );
  }
}

StopMarker.defaultProps = {};

StopMarker.propTypes = {};

export default StopMarker;
