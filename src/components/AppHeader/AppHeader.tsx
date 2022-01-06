// Framework and third-party non-ui
import React from 'react';
import { useHistory } from 'react-router-dom';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import { StyledHeader, HeaderBackButtonContainer } from './AppHeader-styled';

// App components, types

// Third-party components (buttons, icons, etc.)
import ArrowLeftIcon from 'calcite-ui-icons-react/ArrowLeftIcon';

export const AppHeaderBackButton = () => {
  const history = useHistory();

  return (
    <HeaderBackButtonContainer onClick={() => history.goBack()}>
      <ArrowLeftIcon />
    </HeaderBackButtonContainer>
  );
};

export default StyledHeader;
