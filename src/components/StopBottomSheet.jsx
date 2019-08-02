import React, { Component } from 'react';
import styled from 'styled-components';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

const StopBottomSheetContainer = styled.div`
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

const StopBottomSheetTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4em;
  margin-top: 1em;
  text-transform: uppercase;
  font-family: 'Product Sans';
  font-weight: 600;
`;

class StopBottomSheet extends Component {
  render() {
    const { name } = this.props.stop.properties;
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
        <StopBottomSheetContainer>
          <StopBottomSheetTitle>{name}</StopBottomSheetTitle>
        </StopBottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

StopBottomSheet.defaultProps = {
  open: false,
  stop: {
    properties: {
      name: '',
    },
  },
};

export default StopBottomSheet;
