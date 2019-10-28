import styled from 'styled-components';

export function getBottomSheetBodyStyle() {
  return {
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.157) 0px -4px 5px'
  };
}

export const BottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 500;
  font-family: ${props => props.theme.type.avenirFamily};
  font-size: 1.3rem;

  &::after {
    width: 2rem;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: calc(50% - 1rem);
    top: 8px;
    background-color: ${props => props.theme.palette.lighterGray};
    content: '';
  }
`;

export const BottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: ${props => props.theme.type.avenirFamily};
  font-weight: 600;
`;
