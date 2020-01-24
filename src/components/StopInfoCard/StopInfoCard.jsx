// Framework and third-party non-ui
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StyledStopInfoCard,
  StopInfoCardTitle,
  StopImage,
  StopImagePlaceholder,
  ImageLoaderWrapper
} from './StopInfoCard-styled';

// App components

// Third-party components (buttons, icons, etc.)
import Loader from 'calcite-react/Loader';
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';

// JSON

// CSS

class StopInfoCard extends Component {
  state = {
    imageExpanded: false
  };
  toggleImageExpanded = () => {
    this.setState(prevState => ({
      imageExpanded: !prevState.imageExpanded
    }));
  };

  render() {
    const { match, stops } = this.props;
    const { stopKey } = match.params;
    const { name, imageURL } = stops[stopKey].properties;
    console.log(imageURL);

    return (
      <StyledStopInfoCard>
        <CardImage wide src={imageURL} />
        <CardContent wide>
          <CardTitle>{name}</CardTitle>
          <p>Wide cards are just like standard cards except that they are displayed in landscape orientation.</p>
        </CardContent>
      </StyledStopInfoCard>
    );
  }
}

export default withRouter(StopInfoCard);
