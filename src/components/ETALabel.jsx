import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ETALabelWrapper = styled.span`
  position: relative;
  margin-left: auto;
`;

const ETALabelNumber = styled.span`
  position: relative;
  font-size: 1.85em;
  font-weight: bold;

  &::before {
    height: 0.2em;
    width: 0.2em;
    position: absolute;
    left: 0.5em;
    top: 0.1em;
    border-top-right-radius: 100%;
    border-top: 1.5px solid currentColor;
    border-right: 1.5px solid currentColor;
    content: '';
    animation: pulse 2s linear infinite;
  }

  &::after {
    height: 0.35em;
    width: 0.35em;
    position: absolute;
    left: 0.5em;
    top: -0.05em;
    border-top-right-radius: 100%;
    border-top: 1.5px solid currentColor;
    border-right: 1.5px solid currentColor;
    content: '';
    animation: pulse 2s linear 0.75s infinite;
  }

  @keyframes pulse {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ETALabelUnit = styled.span`
  margin-left: 0.1em;
`;

class ETALabel extends PureComponent {
  render() {
    return (
      <ETALabelWrapper>
        <ETALabelNumber>{this.props.number}</ETALabelNumber>
        <ETALabelUnit>{this.props.unit}</ETALabelUnit>
      </ETALabelWrapper>
    );
  }
}

ETALabel.defaultProps = {
  unit: 'min',
};

ETALabel.propTypes = {
  number: PropTypes.number.isRequired,
  unit: PropTypes.string,
};

export default ETALabel;
