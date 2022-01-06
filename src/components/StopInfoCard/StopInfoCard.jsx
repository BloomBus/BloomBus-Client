// Framework and third-party non-ui
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { keyBy } from 'lodash';
import { distance, point } from '@turf/turf';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StyledStopInfoCard,
  StopImage,
  LoopBadge,
  DistanceLabel
} from './StopInfoCard-styled';

// App components

// Third-party components (buttons, icons, etc.)
import { CardTitle, CardContent } from 'calcite-react/Card';

// JSON

// CSS

class StopInfoCard extends PureComponent {
  state = {
    imageExpanded: false
  };

  toggleImageExpanded = () => {
    this.setState((prevState) => ({
      imageExpanded: !prevState.imageExpanded
    }));
  };

  getDistanceLabel = (stop) => {
    const { userLocation } = this.props;
    const from = point(userLocation);
    const to = point(stop.geometry.coordinates);
    const dist = distance(from, to, { units: 'miles' });
    return `${dist.toFixed(1)} mi`;
  };

  render() {
    const { match, stops, loopStops, loops, userLocation } = this.props;
    const { stopKey } = match.params;
    const stop = stops[stopKey];
    const { name, imageURL } = stop.properties;

    const loopKeysThatStopHere = Object.keys(loopStops).filter((loopKey) =>
      loopStops[loopKey].includes(stopKey)
    );

    const loopBadges = loopKeysThatStopHere.map((loopKey) => {
      const loop = keyBy(loops, 'properties.key')[loopKey];
      return loop ? (
        <LoopBadge key={loopKey} color={loop.properties.color}>
          {loop.properties.name.replace('Loop', '').trim()}
        </LoopBadge>
      ) : null;
    });

    return (
      <StyledStopInfoCard>
        <StopImage src={imageURL} />
        <CardContent wide>
          <CardTitle>{name}</CardTitle>
          {loopBadges}
          <div>
            {userLocation ? (
              <DistanceLabel>{this.getDistanceLabel(stop)}</DistanceLabel>
            ) : null}
          </div>
        </CardContent>
      </StyledStopInfoCard>
    );
  }
}

export default withRouter(StopInfoCard);
