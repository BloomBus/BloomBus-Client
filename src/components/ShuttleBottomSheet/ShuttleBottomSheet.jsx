import React, { Component } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

class ShuttleBottomSheet extends Component {
  render() {
    const { loopDisplayName, open, onBottomSheetChange } = this.props.shuttle.properties;
    return (
      <SwipeableBottomSheet
        open={open}
        onChange={onBottomSheetChange}
        overlay={false}
        topShadow={false}
        shadowTip={false}
        bodyStyle={getBottomSheetBodyStyle(open)}
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
      loopDisplayName: ''
    }
  }
};

export default ShuttleBottomSheet;
