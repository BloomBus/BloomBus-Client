import React, { PureComponent } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import ETALabel from '../ETALabel';

import {
  LoopsBottomSheetContainer,
  LoopListItem,
  LoopListItemLeftSide,
  LoopName,
  LoopNextStop,
  LoopsBottomSheetTitle,
} from './LoopsBottomSheet-styled';
import NextStopIcon from './NextStopIcon';

class LoopsBottomSheet extends PureComponent {
  constructor(props) {
    super(props);

    this.getRandomStopName = this.getRandomStopName.bind(this);
  }

  getRandomStopName(loop) {
    if (!this.props.loopStops) return '';
    const { key } = loop.properties;
    const loopStops = this.props.loopStops[key];
    const stopKey = loopStops[Math.floor(Math.random() * loopStops.length)];
    return this.props.stops[stopKey].properties.name;
  }

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
        <LoopsBottomSheetContainer>
          <LoopsBottomSheetTitle>Shuttle Loops</LoopsBottomSheetTitle>
          {this.props.loops.map(loop => (
            <LoopListItem
              key={loop.properties.name}
              tabIndex="0"
              onClick={() => this.props.onLoopSelect(loop.properties.key)}
            >
              <LoopListItemLeftSide>
                <LoopName color={loop.properties.color}>{loop.properties.name}</LoopName>
                <LoopNextStop>
                  <NextStopIcon />
                  {this.getRandomStopName(loop)}
                </LoopNextStop>
              </LoopListItemLeftSide>
              <ETALabel number={3} />
            </LoopListItem>
          ))}
        </LoopsBottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

LoopsBottomSheet.defaultProps = {
  open: true,
  loopStops: undefined,
};

export default LoopsBottomSheet;
