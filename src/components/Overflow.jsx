import React, { Component } from 'react';
import styled from 'styled-components';

import CalciteThemeProvider from 'calcite-react/CalciteThemeProvider';
import Menu, { MenuItem } from 'calcite-react/Menu';
import Popover from 'calcite-react/Popover';
import HandleVerticalIcon from 'calcite-ui-icons-react/HandleVerticalIcon';

const OverflowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

class Overflow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.showOverflow = this.showOverflow.bind(this);
    this.closeOverflow = this.closeOverflow.bind(this);
  }

  showOverflow() {
    this.setState({
      open: !this.state.open,
    });
  }

  closeOverflow() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <OverflowContainer className="overflow">
        <Popover
          targetEl={<HandleVerticalIcon className="button" onClick={this.showOverflow} />}
          open={this.state.open}
          onRequestClose={this.closeOverflow}
          placement=""
        >
          <CalciteThemeProvider>
            <Menu style={{ maxWidth: '280px' }}>
              <MenuItem>Shuttle Schedule</MenuItem>
              <MenuItem>Status Alerts</MenuItem>
              <MenuItem>Feedback</MenuItem>
              <MenuItem>Report an Issue</MenuItem>
              <MenuItem>About</MenuItem>
            </Menu>
          </CalciteThemeProvider>
        </Popover>
      </OverflowContainer>
    );
  }
}

export default Overflow;