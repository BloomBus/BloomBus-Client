// Framework and third-party non-ui
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StyledHeaderTitle,
  LeftHeader,
  CenterHeader,
  RightHeader
} from '../AppHeader/AppHeader-styled';
import { StyledCalciteH4 } from './About-styled';

// App components, types
import AppHeader, { AppHeaderBackButton } from '../AppHeader';
import Page from '../Page';
import Contributors from '../ContributorList';

// Third-party components (buttons, icons, etc.)
import { CalciteH6, CalciteA } from 'calcite-react/Elements';

const About = () => {
  return (
    <Switch>
      <Route exact path="/about">
        <AppHeader>
          <LeftHeader>
            <AppHeaderBackButton />
          </LeftHeader>
          <CenterHeader>
            <StyledHeaderTitle>About</StyledHeaderTitle>
          </CenterHeader>
          <RightHeader />
        </AppHeader>
        <Page>
          <StyledCalciteH4>
            The BloomBus project is built by students in the Department of
            Mathematical and Digital Sciences.
          </StyledCalciteH4>
          <CalciteH6>
            For questions about the project, contact Colin McIntyre at{' '}
            <CalciteA href="mailto:cwm61940@huskies.bloomu.edu">
              cwm61940@huskies.bloomu.edu
            </CalciteA>{' '}
            or visit our{' '}
            <CalciteA target="_blank" href="https://discord.gg/nhuYZEC">
              Discord
            </CalciteA>
            .
          </CalciteH6>
          <StyledCalciteH4>Contributors:</StyledCalciteH4>
          <Contributors />
        </Page>
      </Route>
      <Redirect to="/about" />
    </Switch>
  );
};

export default About;
