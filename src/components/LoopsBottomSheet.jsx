import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import geoJSONFeatureShape from '../utils/geoJSONFeatureShape';

import ETALabel from './ETALabel';

const LoopsBottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    width: 26px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: calc(50% - 13px);
    top: 5px;
    background-color: #dbdbdb;
    content: '';
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
  font-family: 'Product Sans';

  &:active {
    background-color: #f1f1f1;
  }
`;

const LoopsBottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: 'Product Sans';
  font-weight: 600;
`;

class LoopsBottomSheet extends Component {
  render() {
    return (
      <SwipeableBottomSheet
        open={this.props.open}
        onChange={this.props.onBottomSheetChange}
        overlay={false}
        topShadow={false}
        shadowTip={false}
        bodyStyle={{
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
          boxShadow: this.props.open ? 'rgba(0, 0, 0, 0.157) 0px -4px 5px' : 'none',
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
              {loop.properties.name}
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
};

LoopsBottomSheet.propTypes = {
  open: PropTypes.bool,
  loops: PropTypes.arrayOf(geoJSONFeatureShape).isRequired,
  onLoopSelect: PropTypes.func.isRequired,
  onBottomSheetChange: PropTypes.func.isRequired,
};

export default LoopsBottomSheet;
