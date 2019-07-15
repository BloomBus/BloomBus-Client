import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

const LoopsBottomSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoopListItem = styled.button`
  display: block;
  width: 100%;

  background-color: #ffffff;
  outline: none;
  border: none;
  border-top: 2px solid #f1f1f1;
  padding: 0.85em;
  text-align: left;
`;

const LoopsBottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  text-transform: uppercase;
`;

class LoopsBottomSheet extends Component {
  onLoopClick() {}

  render() {
    return (
      <SwipeableBottomSheet
        overlay={false}
        defaultOpen
        topShadow={false}
        bodyStyle={{
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
          boxShadow: 'rgba(0, 0, 0, 0.157) 0px -4px 5px',
        }}
      >
        <LoopsBottomSheetContainer>
          <LoopsBottomSheetTitle>Current Shuttle Loops</LoopsBottomSheetTitle>
          {this.props.loops.map(loop => (
            <LoopListItem
              key={loop.properties.name}
              tabIndex="0"
              onClick={this.onLoopClick}
            >
              {loop.properties.name}
            </LoopListItem>
          ))}
        </LoopsBottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {};

LoopsBottomSheet.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LoopsBottomSheet;
