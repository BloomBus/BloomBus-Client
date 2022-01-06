import styled from 'styled-components';

interface StopMarkerContainerProps {
  selected: boolean;
}
export const StopMarkerContainer = styled.div.attrs<StopMarkerContainerProps>(
  ({ selected }) => ({
    style: {
      width: selected ? '66px' : '42px',
      height: selected ? '66px' : '42px'
    }
  })
)<StopMarkerContainerProps>`
  transform: translate(-50%, -70%);
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  transition-property: width, height, top, left;

  svg circle,
  svg path {
    transition: fill 0.1s linear;
  }
`;
