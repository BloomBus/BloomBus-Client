import PropTypes from 'prop-types';

const geoJSONFeatureShape = PropTypes.objectOf(
  PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
    type: PropTypes.exact('Feature'),
    properties: PropTypes.shape({
      timestamp: PropTypes.number
    })
  })
);

export default geoJSONFeatureShape;
