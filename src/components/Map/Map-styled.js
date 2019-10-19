import styled from 'styled-components';
import { GeolocateControl, NavigationControl } from 'react-map-gl';

export const StyledGeolocateControl = styled(GeolocateControl)`
  position: absolute;
  right: 10px;
  top: 10px;

  button {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const StyledNavigationControl = styled(NavigationControl)`
  position: absolute;
  right: 10px;
  top: 3.6rem;
  
  button {
    height: 2.4rem;
    width: 2.4rem;
  }
`;
