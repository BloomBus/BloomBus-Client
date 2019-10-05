import styled from 'styled-components';
import { GeolocateControl,NavigationControl } from 'react-map-gl';

export const StyledGeolocateControl = styled(GeolocateControl)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const StyledNavigationControl = styled(NavigationControl)`
  position: absolute;
  right: 10px;
  top: 50px;
`;
