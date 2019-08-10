import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AppHeader, { AppHeaderBackButton } from '../AppHeader/AppHeader';

import {
  StyledHeaderTitle, LeftHeader, CenterHeader, RightHeader,
} from '../AppHeader/AppHeader-styled';

class About extends Component {
  render() {
    return (
      <AppHeader>
        <LeftHeader>
          <AppHeaderBackButton />
        </LeftHeader>
        <CenterHeader>
          <StyledHeaderTitle>About</StyledHeaderTitle>
        </CenterHeader>
        <RightHeader />
      </AppHeader>
    );
  }
}

export default withRouter(About);
