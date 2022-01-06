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
  padding: ${({ theme }) => unitCalc(theme.baseline, 3, '/')};
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  left: 50vw;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.palette.offWhite};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const StopInfoCardTitle = styled.h3`
  color: ${({ theme }) => theme.palette.darkerGray};
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
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const StopImagePlaceholder = styled.div`
  background-color: #333;
  color: ${({ theme }) => theme.palette.offWhite};
  font-size: 3rem;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => unitCalc(theme.baseline, 4, '/')};
  transition: all 0.15s;
`;

export const LoopBadge = styled.span`
  background-color: ${({ color }) => color};
  border-radius: 0.9em;
  padding: 0.25em 0.7em;
  font-size: 0.8em;
  margin-right: 0.5em;
  color: white;
`;

export const DistanceLabel = styled.span`
  font-size: 0.9em;
`;
