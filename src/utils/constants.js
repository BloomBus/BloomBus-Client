import PropTypes from 'prop-types';

/* global google */
export const swBound = new google.maps.LatLng({
  lat: 41.005188,
  lng: -76.452374,
});

export const neBound = new google.maps.LatLng({
  lat: 41.019014,
  lng: -76.443321,
});

export const campusBounds = new google.maps.LatLngBounds(swBound, neBound);

export const mapStyles = [{
  featureType: 'poi',
  elementType: 'labels',
  stylers: [{
    visibility: 'off',
  }],
}];

export const campusCenter = {
  lat: -34.397,
  lng: 150.644,
};

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
