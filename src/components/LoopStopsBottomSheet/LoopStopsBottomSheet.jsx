import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';
import { LoopStopsListItem, LoopStopsListItemLeftSide, LoopStopsName } from './LoopStopsBottomSheet-styled';
// import ETALabel from '../ETALabel/ETALabel';

import NextStopIcon from '../NextStopIcon/NextStopIcon';

class LoopStopsBottomSheet extends PureComponent {
  render() {
    const { open, selectedLoop, selectedLoopStops, stops, onStopSelect, onBottomSheetChange } = this.props;
    // let eta = 1;
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
          <BottomSheetTitle>{selectedLoop}</BottomSheetTitle>
          {selectedLoopStops.map(stopKey => {
            const stop = stops[stopKey];
            // eta += Math.ceil(Math.random() * 3);
            return (
              <LoopStopsListItem key={stop.properties.name} tabIndex="0" onClick={() => onStopSelect(stopKey)}>
                <LoopStopsListItemLeftSide>
                  <NextStopIcon width="40" height="40" />
                  <LoopStopsName color={stop.properties.color}>{stop.properties.name}</LoopStopsName>
                </LoopStopsListItemLeftSide>
                {/* <ETALabel number={eta} /> */}
              </LoopStopsListItem>
            );
          })}
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopStopsBottomSheet.defaultProps = {
  open: true,
  selectedLoopStops: []
};

export default LoopStopsBottomSheet;
