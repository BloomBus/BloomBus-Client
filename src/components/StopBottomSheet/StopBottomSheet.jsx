import React, { Component } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { BottomSheetTitle } from '../../utils/commonElements';
import { StopBottomSheetContainer } from './StopBottomSheet-styled';

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
          <BottomSheetTitle>{name}</BottomSheetTitle>
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
