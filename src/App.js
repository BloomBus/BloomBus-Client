/* eslint-disable */
import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Home from './components/Home';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import './App.css';

class App extends Component {
  componentDidMount() {
    LogRocket.init('ayfdlv/bloombus');
    setupLogRocketReact(LogRocket);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
