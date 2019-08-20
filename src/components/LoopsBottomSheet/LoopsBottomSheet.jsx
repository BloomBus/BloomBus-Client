import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { LoopListItem, LoopListItemLeftSide, LoopName } from './LoopsBottomSheet-styled';
import { BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

class LoopsBottomSheet extends PureComponent {
  render() {
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
          <BottomSheetTitle>Shuttle Loops</BottomSheetTitle>
          {this.props.loops.map(loop => (
            <LoopListItem
              key={loop.properties.name}
              tabIndex="0"
              onClick={() => this.props.onLoopSelect(loop.properties.key)}
            >
              <LoopListItemLeftSide>
                <LoopName color={loop.properties.color}>{loop.properties.name}</LoopName>
              </LoopListItemLeftSide>
            </LoopListItem>
          ))}
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {
  open: true,
};

export default LoopsBottomSheet;
