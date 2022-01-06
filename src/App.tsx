/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import CalciteThemeProvider from 'calcite-react/CalciteThemeProvider';

import Home from './components/Home';
import About from './components/About';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <CalciteThemeProvider>
        <Switch>
          <Route path="/about" component={About} />
          <Route
            path={[
              '/loops',
              '/stop/:stopKey',
              '/loop/:loopKey',
              '/shuttle/:shuttleID',
              '/'
            ]}
            component={Home}
          />
          <Redirect to="/" />
        </Switch>
      </CalciteThemeProvider>
    </BrowserRouter>
  );
};

export default App;
