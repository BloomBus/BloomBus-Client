/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'mapbox-gl/dist/mapbox-gl.css';

// Load calcite-components
import '@esri/calcite-components';
import '@esri/calcite-components/dist/calcite/calcite.css';
import { defineCustomElements } from '@esri/calcite-components/dist/loader';
defineCustomElements(window, {
  resourcesUrl: 'https://js.arcgis.com/calcite-components/1.0.0-beta.78/assets'
});

ReactDOM.render(<App />, document.getElementById('root'));
