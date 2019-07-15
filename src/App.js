/* eslint-disable */
import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
