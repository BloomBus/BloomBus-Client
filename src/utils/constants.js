import PropTypes from 'prop-types';

export const mapStyles = [{
  featureType: 'poi',
  elementType: 'labels',
  stylers: [{
    visibility: 'off',
  }],
}];

export const geoJSONFeatureShape = PropTypes.objectOf(
  PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    type: PropTypes.string,
    properties: PropTypes.shape({
      timestamp: PropTypes.number,
    }),
  }),
);

export const shuttleSymbolPath = ' M 4.7 16.85 C 1 31.85 0 59.35 0 87.05 C 0 114.65 1 142.45 4.6 157.35 C 7.4 168.95 18 174.35 33.4 174.05 L 444.275 174.05 C 464.775 174.35 481.4 174.35 490.4 172.75 C 510.4 169.75 541.775 172.75 573.2 154.35 C 579.2 136.75 582 111.95 582 87.05 C 582 62.15 579.2 37.25 573.2 19.65 C 551.9 6.25 515.2 4.45 495.2 1.25 C 475.4 0.25 465.9 -0.15 445.4 0.05 L 33.4 0.05 C 18 -0.35 7.4 5.05 4.6 16.85';
