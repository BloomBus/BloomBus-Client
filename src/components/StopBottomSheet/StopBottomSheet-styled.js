import styled from 'styled-components';

export const StopBottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    width: 26px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: calc(50% - 13px);
    top: 5px;
    background-color: #dbdbdb;
    content: '';
  }
`;
