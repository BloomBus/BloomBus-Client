import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ETALabelWrapper,
  ETALabelNumber,
  ETALabelUnit
} from './ETALabel-styled';

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
  unit: 'min'
};

ETALabel.propTypes = {
  number: PropTypes.number.isRequired,
  unit: PropTypes.string
};

export default ETALabel;
