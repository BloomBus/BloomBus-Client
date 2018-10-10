import React, { Component } from 'react';
import { Drawer, List } from 'antd-mobile';

class ShuttlesDrawer extends Component {
  render() {
    return (
      <Drawer
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: '42px' }}
        sidebar={
          <List renderHeader={() => 'Available Shuttles'}>
            {
              this.props.shuttles && Object.entries(this.props.shuttles).map(([key, shuttle], i) => 
                <List.Item key={i} onClick={() => this.props.onSelect(key)}>
                  {shuttle.properties.name}
                </List.Item>
              )
            }
          </List>
        }
        open={this.props.isOpen}>
      </Drawer>
    );
  }
}

export default ShuttlesDrawer;