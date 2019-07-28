import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import geoJSONFeatureShape from '../utils/geoJSONFeatureShape';

const SidebarContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 15vw;
  z-index: 1;
  top: 51px;
  left: 0;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: absolute;
  float: left;
`;

const SidebarTitle = styled.h1`
  font-family: 'Product Sans';
  margin-top: 1rem;
  font-weight: 800;
  align-self: center;
`;

const SidebarItem = styled.button`
  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  font-family: 'Product Sans';
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.color || 'inherit'};
`;

const SidebarHead = styled.div`
  height: 110px;
  box-sizing: border-box;
  overflow: hidden;
  filter: saturate(90%) brightness(100%);
  cursor: pointer;
  transition: color 0.5s;
`;

const SidebarName = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  font-size: 2em;
  font-family: 'Product Sans';
  color: #000;
  line-height: 1em;
  color: ${props => props.color || 'inherit'};
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SidebarContainer>
        <SidebarTitle>Shuttle Loops</SidebarTitle>
        {this.props.loops.map(loop => (
          <SidebarItem key={loop.properties.name} onClick={() => this.props.onLoopSelect(loop.properties.key)}>
            {/*  */}
            <SidebarHead>
              {/* List Header */}
              <SidebarName color={loop.properties.color}>{loop.properties.name}</SidebarName>
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
