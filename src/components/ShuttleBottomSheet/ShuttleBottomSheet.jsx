import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

class ShuttleBottomSheet extends Component {
  render() {
    const { shuttleID } = this.props.match.params;
    const shuttle = this.props.shuttles[shuttleID];
    const { loopDisplayName, onBottomSheetChange } = shuttle.properties;
    return (
      <SwipeableBottomSheet
        open={true}
        onChange={onBottomSheetChange}
        overlay={false}
        topShadow={false}
        shadowTip={false}
        bodyStyle={getBottomSheetBodyStyle()}
      >
        <BottomSheetContainer>
          <BottomSheetTitle>{`${loopDisplayName} Shuttle`}</BottomSheetTitle>
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

ShuttleBottomSheet.defaultProps = {};

export default withRouter(ShuttleBottomSheet);
