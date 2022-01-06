import styled from 'styled-components';

export const StopMarkerContainer = styled.div.attrs((props) => ({
  style: {
    width: props.selected ? '66px' : '42px',
    height: props.selected ? '66px' : '42px'
  }
}))`
  transform: translate(-50%, -70%);
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  transition-property: width, height, top, left;

  svg circle,
  svg path {
    transition: fill 0.1s linear;
  }
`;
