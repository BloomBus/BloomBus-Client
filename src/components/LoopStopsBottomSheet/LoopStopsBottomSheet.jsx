// Framework and third-party non-ui
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  LoopStopsListItem,
  LoopStopsListItemLeftSide,
  LoopStopsName
} from './LoopStopsBottomSheet-styled';

// App components
import {
  getBottomSheetBodyStyle,
  BottomSheetContainer,
  BottomSheetTitle
} from '../../utils/commonElements';
// import ETALabel from '../ETALabel/ETALabel';

// Third-party components (buttons, icons, etc.)
import NextStopIcon from '../NextStopIcon';

// JSON

// CSS

class LoopStopsBottomSheet extends PureComponent {
  render() {
    const {
      match,
      loopStops,
      stops,
      onStopSelect,
      onBottomSheetChange
    } = this.props;
    // let eta = 1;
    const { loopKey: selectedLoop } = match.params;
    const selectedLoopStops = (loopStops && loopStops[selectedLoop]) || [];
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
          <BottomSheetTitle>{selectedLoop}</BottomSheetTitle>
          {selectedLoopStops.map(stopKey => {
            const stop = stops[stopKey];
            // eta += Math.ceil(Math.random() * 3);
            return (
              <LoopStopsListItem
                key={stop.properties.name}
                tabIndex="0"
                onClick={() => onStopSelect(stopKey)}
              >
                <LoopStopsListItemLeftSide>
                  <NextStopIcon width="40" height="40" />
                  <LoopStopsName color={stop.properties.color}>
                    {stop.properties.name}
                  </LoopStopsName>
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

export default withRouter(LoopStopsBottomSheet);
