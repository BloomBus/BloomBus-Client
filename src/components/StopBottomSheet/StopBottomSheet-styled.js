import styled from 'styled-components';
import Img from 'react-image';
import { unitCalc } from 'calcite-react/utils/helpers';

export const StopBottomSheetContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: ${props => unitCalc(props.theme.baseline, 3, '/')};
  box-sizing: border-box;
`;

export const ImageLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
`;

export const StopImage = styled(Img)`
  font-size: 3em;
  height: ${props => props.imageExpanded ? '200px' : '100px'};
  width: ${props => props.imageExpanded ? '200px' : '100px'};
  border-radius: ${props => unitCalc(props.theme.baseline, 4, '/')};
  transition: all 0.15s;
`;

export const StopImagePlaceholder = styled.div`
  background-color: #333;
  color: ${props => props.theme.palette.offWhite};
  font-size: ${props => props.imageExpanded ? '6rem' : '3rem'};
  height: ${props => props.imageExpanded ? '200px' : '100px'};
  width: ${props => props.imageExpanded ? '200px' : '100px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => unitCalc(props.theme.baseline, 4, '/')};
  transition: all 0.15s;
`;
