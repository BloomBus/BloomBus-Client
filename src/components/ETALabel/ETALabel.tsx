import React from 'react';

import {
  ETALabelWrapper,
  ETALabelNumber,
  ETALabelUnit
} from './ETALabel-styled';

interface ETALabelProps {
  number: number;
  unit: 'min';
}
const ETALabel: React.FC<ETALabelProps> = ({ number, unit }) => {
  return (
    <ETALabelWrapper>
      <ETALabelNumber>{number}</ETALabelNumber>
      <ETALabelUnit>{unit}</ETALabelUnit>
    </ETALabelWrapper>
  );
};

export default ETALabel;
