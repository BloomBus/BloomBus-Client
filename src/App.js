/* eslint-disable */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import AppHeader from './components/AppHeader';
import Home from './components/Home';
import About from './components/About';

import './App.css';

class App extends Component {
  componentDidMount() {
    LogRocket.init('ayfdlv/bloombus');
    setupLogRocketReact(LogRocket);
  }

  render() {
    return (
      <>
        <AppHeader />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
