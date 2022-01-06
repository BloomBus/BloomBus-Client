import styled from 'styled-components';
import { GeolocateControl, NavigationControl } from 'react-map-gl';

export const MapControlsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

export const StyledGeolocateControl = styled(GeolocateControl)`
  button {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const StyledNavigationControl = styled(NavigationControl)`
  button {
    height: 2.4rem;
    width: 2.4rem;
  }
`;
