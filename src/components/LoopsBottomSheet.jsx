import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import geoJSONFeatureShape from "../utils/geoJSONFeatureShape";

import ETALabel from "./ETALabel";

const LoopsBottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    width: 50px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: calc(50% - 25px);
    top: 8px;
    background-color: #dbdbdb;
    content: "";
  }
`;

const LoopListItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  padding: 0.85em;
  font-family: "Product Sans";

  &:active {
    background-color: #f1f1f1;
  }
`;

const LoopListItemLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoopName = styled.span`
  font-size: 1.3em;
  font-weight: 600;
  align-self: flex-start;
  color: #ffffff;
  color: ${props => props.color || "inherit"};
`;

const LoopNextStop = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9em;
  color: rgba(#b5b5b6);
  margin-top: 0.1em;
`;

const LoopsBottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: "Product Sans";
  font-weight: 600;
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

class LoopsBottomSheet extends PureComponent {
  constructor(props) {
    super(props);

    this.getRandomStopName = this.getRandomStopName.bind(this);
  }

  getRandomStopName(loop) {
    if (!this.props.loopStops) return "";
    const { key } = loop.properties;
    const loopStops = this.props.loopStops[key];
    const stopKey = loopStops[Math.floor(Math.random() * loopStops.length)];
    return this.props.stops[stopKey].properties.name;
  }

  render() {
    return (
      <SwipeableBottomSheet
        open={this.props.open}
        onChange={this.props.onBottomSheetChange}
        overlay={false}
        topShadow={false}
        shadowTip={false}
        bodyStyle={{
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          boxShadow: this.props.open
            ? "rgba(0, 0, 0, 0.157) 0px -4px 5px"
            : "none"
        }}
      >
        <LoopsBottomSheetContainer>
          <LoopsBottomSheetTitle>Shuttle Loops</LoopsBottomSheetTitle>
          {this.props.loops.map(loop => (
            <LoopListItem
              key={loop.properties.name}
              tabIndex="0"
              onClick={() => this.props.onLoopSelect(loop.properties.key)}
            >
              <LoopListItemLeftSide>
                <LoopName color={loop.properties.color}>
                  {loop.properties.name}
                </LoopName>
                <LoopNextStop>
                  <NextStopIcon />
                  {this.getRandomStopName(loop)}
                </LoopNextStop>
              </LoopListItemLeftSide>
              <ETALabel number={3} />
            </LoopListItem>
          ))}
        </LoopsBottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {
  open: true,
  loopStops: undefined
};

LoopsBottomSheet.propTypes = {
  open: PropTypes.bool,
  loops: PropTypes.arrayOf(geoJSONFeatureShape).isRequired,
  loopStops: PropTypes.objectOf(PropTypes.string),
  onLoopSelect: PropTypes.func.isRequired,
  onBottomSheetChange: PropTypes.func.isRequired
};

export default LoopsBottomSheet;
