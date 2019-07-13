import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShuttleSVG from '../../images/shuttle.svg';

const ShuttleMarkerContainer = styled.div`
  width: 42px;
  height: 42px;
  transform: rotate(${props => `${props.bearing}deg`});
`;

class ShuttleMarker extends Component {
  render() {
    return (
      <ShuttleMarkerContainer bearing={this.props.bearing - 90}>
        <img src={ShuttleSVG} alt="Shuttle Marker" width={20} />
      </ShuttleMarkerContainer>
    );
  }
}

ShuttleMarker.defaultProps = {
  bearing: 0,
};

ShuttleMarker.propTypes = {
  bearing: PropTypes.number,
};

export default ShuttleMarker;
