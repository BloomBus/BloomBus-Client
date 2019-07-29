import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import geoJSONFeatureShape from '../utils/geoJSONFeatureShape';

import ETALabel from './ETALabel';

const SidebarContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 15vw;
  z-index: 1;
  top: 51px;

  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.85em;
  margin-bottom: 1rem;

  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  font-family: 'Product Sans';

  &:active {
    background-color: #f1f1f1;
  }
`;

const SidebarHead = styled.div`
  height: 5em;
  box-sizing: border-box;
  overflow: hidden;
  filter: saturate(90%) brightness(100%);
  cursor: pointer;
  transition: color 0.5s;
`;

const SidebarLoopNames = styled.span`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;
  margin-bottom: 0.5rem;

  line-height: 1em;
  font-weight: 800;
  font-size: 2em;
  font-family: 'Product Sans';
  color: ${props => props.color || 'inherit'};
`;

const LoopNextStop = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1em;
  color: rgba(#b5b5b6);
  margin-top: 0.1em;
`;

const NextStopSVG = styled.svg`
  height: 1em;
  margin-right: 0.2em;
`;

const NextStopIcon = () => (
  <NextStopSVG viewBox="0 0 30 20">
    <path
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      fill="#777b8e"
      d="M9.89 10.84h7.31v4.07l6-5.24-6-5.2v4.1H9.88v2.24H0V8.57h9.88a9.7 9.7 0 1 1 0 2.27z"
    />
  </NextStopSVG>
);

class Sidebar extends PureComponent {
  // Grabs a random stop name. Created by John Gibson
  getRandomStopName(loop) {
    if (!this.props.loopStops) return '';
    const { key } = loop.properties;
    const loopStops = this.props.loopStops[key];
    const stopKey = loopStops[Math.floor(Math.random() * loopStops.length)];
    return this.props.stops[stopKey].properties.name;
  }

  render() {
    return (
      <SidebarContainer>
        {/* Title above the loops */}
        <SidebarTitle>Shuttle Loops</SidebarTitle>
        {this.props.loops.map(loop => (
          <SidebarItem
            key={loop.properties.name}
            tabIndex="0"
            onClick={() => this.props.onLoopSelect(loop.properties.key)}
          >
            <SidebarHead>
              <SidebarLoopNames color={loop.properties.color}>{loop.properties.name}</SidebarLoopNames>
            </SidebarHead>
            <LoopNextStop>
              <NextStopIcon />
              {this.getRandomStopName(loop)}
              {/* Adding a "Tab" */}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ETALabel number={3} />
            </LoopNextStop>
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
