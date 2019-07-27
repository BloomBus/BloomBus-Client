import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import geoJSONFeatureShape from '../utils/geoJSONFeatureShape';

const SidebarContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 15vw;
  position: fixed;
  z-index: 1;
  top: 5%;
  left: 0;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
`;

const SidebarItem = styled.div``;

const SidebarHead = styled.div`
  height: 110px;
  box-sizing: border-box;
  overflow: hidden;
  filter: saturate(90%) brightness(100%);
  cursor: pointer;
  transition: color 0.5s;
`;

const SidebarNotch = styled.div`
  --notch-height: 0.3rem;
  --notch-width: 1.7rem;
  width: var(--notch-width);
  height: var(--notch-height);
  background-color: #fff;
  border-radius: calc(var(--notch-height) / 2);
  position: relative;
  left: calc(50vw - calc(var(--notch-width) / 2));
  top: 0.55rem;
  z-index: 900;
`;

const SidebarName = styled.span`
  display: inline-block;
  margin-left: 1.4rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  font-size: 2em;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1em;
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SidebarContainer>
        {this.props.loops.map(loop => (
          <SidebarItem
            key={loop.properties.name}
            className="sidebar__card"
            role="button"
            tabIndex="0"
            onClick={this.onLoopClick}
            onKeyDown={this.onLoopClick}
          >
            {/*  */}
            <SidebarHead>
              <SidebarNotch />
              {/* List Header */}
              <SidebarName>{loop.properties.name}</SidebarName>
            </SidebarHead>
            {/* List Item of Stops */}
          </SidebarItem>
        ))}
      </SidebarContainer>
    );
  }
}

Sidebar.defaultProps = {
  loopStops: undefined,
};

Sidebar.propTypes = {
  loops: PropTypes.arrayOf(geoJSONFeatureShape).isRequired,
  loopStops: PropTypes.objectOf(PropTypes.string),
  onLoopSelect: PropTypes.func.isRequired,
};

export default Sidebar;
