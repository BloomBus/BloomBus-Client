/* global */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List } from 'antd-mobile';
import { geoJSONFeatureShape } from '../../utils/constants';

class ShuttlesDrawer extends Component {
  componentDidUpdate() {
    /* const formattedCoords = this.props.shuttles
      && (Object.values(this.props.shuttles)).map(shuttle => `
      ${shuttle.geometry.coordinates[0]},${shuttle.geometry.coordinates[1]}`);
     fetch(`http://maps.googleapis.com/maps/api/directions/json?origins=${formattedCoords.join('|')}&key=AIzaSyCfWbVagQG3V60EEF2JtJDTHZIt6C8sDeQ`)
      .then(response => response.json())
      .then(json => console.log(json)); */
  }

  render() {
    const listItems = this.props.shuttles
      && Object.entries(this.props.shuttles).map(([key, shuttle]) => (
        <List.Item key={key} onClick={() => this.props.onSelect(key)}>
          {shuttle.properties.name}
        </List.Item>
      ));
    return (
      <Drawer
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: '42px' }}
        sidebar={(
          <List renderHeader={() => 'Available Shuttles'}>
            {listItems}
          </List>
        )}
        open={this.props.isOpen}
      />
    );
  }
}

ShuttlesDrawer.propTypes = {
  shuttles: geoJSONFeatureShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ShuttlesDrawer;
