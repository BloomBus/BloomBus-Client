import styled from 'styled-components';
import Img from 'react-image';
import { unitCalc } from 'calcite-react/utils/helpers';

import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';

export const StyledStopInfoCard = styled(Card).attrs({
  wide: true
})`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 400px;
  max-width: calc(600vw - 10px);
  padding: ${props => unitCalc(props.theme.baseline, 3, '/')};
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  left: 50vw;
  transform: translateX(-50%);
  background-color: ${props => props.theme.palette.offWhite};
  border-radius: ${props => props.theme.borderRadius};
`;

export const StopInfoCardTitle = styled.h3`
  color: ${props => props.theme.palette.darkerGray};
`;

export const ImageLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StopImage = styled(Img)`
  font-size: 3em;
  height: 100px;
  width: 100px;
  border-radius: ${props => unitCalc(props.theme.baseline, 4, '/')};
  transition: all 0.15s;
`;

export const StopImagePlaceholder = styled.div`
  background-color: #333;
  color: ${props => props.theme.palette.offWhite};
  font-size: ${props => props.imageExpanded ? '6rem' : '3rem'};
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => unitCalc(props.theme.baseline, 4, '/')};
  transition: all 0.15s;
`;
