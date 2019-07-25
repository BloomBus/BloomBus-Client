import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import geoJSONFeatureShape from "../utils/geoJSONFeatureShape";

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

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.getRandomStopName = this.getRandomStopName.bind(this);
  }

  render() {
    return (
      <SidebarContainer>
        {this.props.loops.map(loop => (
          <div
            key={loop.properties.name}
            className="sidebar__card"
            role="button"
            tabIndex="0"
            onClick={this.onLoopClick}
            onKeyDown={this.onLoopClick}
          >
            {/*  */}
            <div className="sidebar__card__head">
              <div className="sidebar__card__notch" />
              {/* List Header */}
              <span className="sidebar__card__name">
                {loop.properties.name}
              </span>
            </div>
            {/* List Item of Stops */}
          </div>
        ))}
      </SidebarContainer>
    );
  }
}

Sidebar.defaultProps = {
  loopStops: undefined
};

Sidebar.propTypes = {
  loops: PropTypes.arrayOf(geoJSONFeatureShape).isRequired,
  loopStops: PropTypes.objectOf(PropTypes.string),
  onLoopSelect: PropTypes.func.isRequired
};

export default Sidebar;
