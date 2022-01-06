import styled from 'styled-components';
import { unitCalc } from 'calcite-react/utils/helpers';

import Card, { CardImage } from 'calcite-react/Card';

export const StyledStopInfoCard = styled(Card).attrs({
  wide: true
})`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 30em;
  max-width: calc(100vw - 20px);
  padding: ${(props) => unitCalc(props.theme.baseline, 3, '/')};
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  left: 50vw;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.palette.offWhite};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const StopInfoCardTitle = styled.h3`
  color: ${(props) => props.theme.palette.darkerGray};
`;

export const ImageLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StopImage = styled(CardImage).attrs({
  wide: true
})`
  height: 130px;
  width: 130px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const StopImagePlaceholder = styled.div`
  background-color: #333;
  color: ${(props) => props.theme.palette.offWhite};
  font-size: ${(props) => (props.imageExpanded ? '6rem' : '3rem')};
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => unitCalc(props.theme.baseline, 4, '/')};
  transition: all 0.15s;
`;

export const LoopBadge = styled.span`
  background-color: ${(props) => props.color};
  border-radius: 0.9em;
  padding: 0.25em 0.7em;
  font-size: 0.8em;
  margin-right: 0.5em;
  color: white;
`;

export const DistanceLabel = styled.span`
  font-size: 0.9em;
`;
