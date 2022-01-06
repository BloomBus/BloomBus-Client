import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import {
  LoopListItem,
  LoopListItemLeftSide,
  LoopListItemRightSide,
  LoopName
} from './LoopsBottomSheet-styled';
import {
  getBottomSheetBodyStyle,
  BottomSheetContainer,
  BottomSheetTitle
} from '../../utils/commonElements';

import MoonIcon from 'calcite-ui-icons-react/MoonIcon';

class LoopsBottomSheet extends PureComponent {
  render() {
    const { loops, shuttles, onBottomSheetChange, onLoopSelect } = this.props;
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
          <BottomSheetTitle>Shuttle Loops</BottomSheetTitle>
          {loops.map((loop) => {
            const noShuttlesAvailable =
              !shuttles ||
              Object.values(shuttles).filter(
                (shuttle) => shuttle.properties.loopKey === loop.properties.key
              ).length === 0;
            return (
              <LoopListItem
                key={loop.properties.name}
                tabIndex="0"
                onClick={() => onLoopSelect(loop.properties.key)}
              >
                <LoopListItemLeftSide>
                  <LoopName color={loop.properties.color}>
                    {loop.properties.name}
                  </LoopName>
                </LoopListItemLeftSide>
                <LoopListItemRightSide>
                  {noShuttlesAvailable ? <MoonIcon size={25} /> : null}
                </LoopListItemRightSide>
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
