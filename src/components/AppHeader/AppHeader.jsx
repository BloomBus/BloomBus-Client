// Framework and third-party non-ui
import React from 'react';
import { withRouter } from 'react-router-dom';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import { StyledHeader, HeaderBackButtonContainer } from './AppHeader-styled';

// App components

// Third-party components (buttons, icons, etc.)
import ArrowLeftIcon from 'calcite-ui-icons-react/ArrowLeftIcon';

const AppHeader = props => <StyledHeader {...props} />;

export const AppHeaderBackButton = withRouter(props => (
  <HeaderBackButtonContainer onClick={() => props.history.goBack()}>
    <ArrowLeftIcon />
  </HeaderBackButtonContainer>
));

export default withRouter(AppHeader);
