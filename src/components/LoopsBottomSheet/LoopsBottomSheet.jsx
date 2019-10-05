import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { LoopListItem, LoopListItemLeftSide, LoopListItemRightSide, LoopName } from './LoopsBottomSheet-styled';
import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

import OfflineIcon from 'calcite-ui-icons-react/OfflineIcon';

class LoopsBottomSheet extends PureComponent {
  render() {
    const { open, loops, shuttles, onBottomSheetChange, onLoopSelect } = this.props;
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
          <BottomSheetTitle>Shuttle Loops</BottomSheetTitle>
          {loops.map(loop => {
            const noShuttlesAvailable =
              shuttles &&
              Object.values(shuttles).filter(shuttle => shuttle.properties.loopKey === loop.properties.key).length ===
                0;
            return (
              <LoopListItem key={loop.properties.name} tabIndex="0" onClick={() => onLoopSelect(loop.properties.key)}>
                <LoopListItemLeftSide>
                  <LoopName color={loop.properties.color}>{loop.properties.name}</LoopName>
                </LoopListItemLeftSide>
                <LoopListItemRightSide>{noShuttlesAvailable ? <OfflineIcon size={20} /> : null}</LoopListItemRightSide>
              </LoopListItem>
            );
          })}
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {
  open: true
};

export default LoopsBottomSheet;
