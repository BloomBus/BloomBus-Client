import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StopsList.css';
import { Timeline } from 'antd';

class StopsList extends Component {
  render() {
    return (
      <div className="stops-list">
        <Timeline>
          {this.props.stops.map(stop => (
            <Timeline.Item
              key={stop.properties.name}
              className="stops-list__item"
            >
              {stop.properties.name}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  }
}

StopsList.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StopsList;
