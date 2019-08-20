import styled from 'styled-components';

export const BottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 500;

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

export const BottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: 'Product Sans';
  font-weight: 600;
`;
