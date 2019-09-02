import React, { Component } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

class ShuttleBottomSheet extends Component {
  render() {
    const { loopDisplayName } = this.props.shuttle.properties;
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
        <BottomSheetContainer>
          <BottomSheetTitle>{`${loopDisplayName} Shuttle`}</BottomSheetTitle>
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

ShuttleBottomSheet.defaultProps = {
  open: false,
  shuttle: {
    properties: {
      loopDisplayName: '',
    },
  },
};

export default ShuttleBottomSheet;
