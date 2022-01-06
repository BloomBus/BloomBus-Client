import styled from 'styled-components';

export const LoopStopsListItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  padding: 0.85em;

  &:active {
    background-color: #f1f1f1;
  }
`;

export const LoopStopsListItemLeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LoopStopsName = styled.span`
  font-family: ${({ theme }) => theme.type.avenirFamily};
  font-size: 1.8em;
  font-weight: 600;
  align-self: flex-start;
  color: #ffffff;
  color: ${({ color }) => color || 'inherit'};
  margin-left: 0.3em;
`;
