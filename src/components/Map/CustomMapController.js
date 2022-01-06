// Reference: https://github.com/uber/react-map-gl/blob/master/docs/advanced/custom-map-controller.md

import { MapController } from 'react-map-gl';

export default class CustomMapController extends MapController {
  constructor() {
    super();
    // subscribe to additional events
    this.events = ['geolocate'];
  }

  handleEvent(event) {
    switch (event.type) {
      case 'geolocate':
        this.alert('geolocate emitted');
        break;
      default:
    }
    return super.handleEvent(event);
  }
}
