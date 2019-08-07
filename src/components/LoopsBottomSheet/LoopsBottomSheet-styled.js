import styled from 'styled-components';

const LoopsBottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    width: 50px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: calc(50% - 25px);
    top: 8px;
    background-color: #dbdbdb;
    content: '';
  }
`;

const LoopListItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  padding: 0.85em;
  font-family: 'Product Sans';

  &:active {
    background-color: #f1f1f1;
  }
`;

const LoopListItemLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoopName = styled.span`
  font-size: 1.3em;
  font-weight: 600;
  align-self: flex-start;
  color: #ffffff;
  color: ${props => props.color || 'inherit'};
`;

const LoopNextStop = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9em;
  color: rgba(#b5b5b6);
  margin-top: 0.1em;
`;

const LoopsBottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: 'Product Sans';
  font-weight: 600;
`;

const NextStopSVG = styled.svg`
  height: 1em;
  margin-right: 0.2em;
`;

export {
  LoopsBottomSheetContainer,
  LoopListItem,
  LoopListItemLeftSide,
  LoopName,
  LoopNextStop,
  LoopsBottomSheetTitle,
  NextStopSVG,
};
