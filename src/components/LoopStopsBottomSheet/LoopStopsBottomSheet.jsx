import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import { BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';
import { LoopStopsListItem, LoopStopsListItemLeftSide, LoopStopsName } from './LoopStopsBottomSheet-styled';
import NextStopIcon from '../NextStopIcon/NextStopIcon';

class LoopsBottomSheet extends PureComponent {
  render() {
    const {
      open, selectedLoop, selectedLoopStops, stops, onStopSelect, onBottomSheetChange,
    } = this.props;
    let eta = 1;
    return (
      <SwipeableBottomSheet
        open={open}
        onChange={onBottomSheetChange}
        overlay={false}
        topShadow={false}
        shadowTip={false}
        bodyStyle={{
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
          boxShadow: open ? 'rgba(0, 0, 0, 0.157) 0px -4px 5px' : 'none',
        }}
      >
        <BottomSheetContainer>
          <BottomSheetTitle>{selectedLoop.properties && selectedLoop.properties.name}</BottomSheetTitle>
          {selectedLoopStops.map((stopKey) => {
            const stop = stops[stopKey];
            eta += Math.ceil(Math.random() * 3);
            return (
              <LoopStopsListItem key={stop.properties.name} tabIndex="0" onClick={() => onStopSelect(stopKey)}>
                <LoopStopsListItemLeftSide>
                  <NextStopIcon />
                  <LoopStopsName color={stop.properties.color}>{stop.properties.name}</LoopStopsName>
                </LoopStopsListItemLeftSide>
                {/* need to readd import ETALabel from '../ETALabel/ETALabel'; */}
                {/* <ETALabel number={eta} /> */}
              </LoopStopsListItem>
            );
          })}
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {
  open: true,
  selectedLoopStops: [],
};

export default LoopsBottomSheet;
