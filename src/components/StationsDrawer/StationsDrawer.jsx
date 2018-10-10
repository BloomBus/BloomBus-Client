import React, { Component } from 'react';
import { Drawer, List } from 'antd-mobile';
import StationsContext from '../../contexts/StationsContext.jsx';

class StationsDrawer extends Component {
  render() {
    return (
      <Drawer
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: '42px' }}
        sidebar={
          <StationsContext.Consumer>
          {({ stations, stationMarkers }) => (
            <List renderHeader={() => 'Shuttle Stations'}>
              {
                stations && stations.map((station, i) => 
                  <List.Item key={i} onClick={() => this.props.onSelect(station.properties.name)}>
                    {station.properties.name}
                  </List.Item>
                )
              }
            </List>
          )}
          </StationsContext.Consumer>
        }
        open={this.props.isOpen}>
      </Drawer>
    )
  }
}

export default StationsDrawer;