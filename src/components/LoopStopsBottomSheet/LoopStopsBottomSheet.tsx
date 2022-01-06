// Framework and third-party non-ui
import React from 'react';
import { useParams } from 'react-router-dom';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  LoopStopsListItem,
  LoopStopsListItemLeftSide,
  LoopStopsName
} from './LoopStopsBottomSheet-styled';

// App components, types
import { LoopKey, LoopStops, StopKey, Stops } from 'types';
import {
  bottomSheetBodyStyle,
  BottomSheetContainer,
  BottomSheetTitle
} from '../../utils/commonElements';
import NextStopIcon from '../NextStopIcon';
// import ETALabel from '../ETALabel/ETALabel';

// Third-party components (buttons, icons, etc.)

interface LoopStopsBottomSheetProps {
  loopStops: LoopStops;
  stops: Stops;
  onStopSelect: (stopKey: StopKey) => void;
  onBottomSheetChange: (open: boolean) => void;
}
const LoopStopsBottomSheet: React.FC<LoopStopsBottomSheetProps> = ({
  loopStops,
  stops,
  onStopSelect,
  onBottomSheetChange
}) => {
  // let eta = 1;
  const { loopKey: selectedLoop } = useParams<{ loopKey: LoopKey }>();
  const selectedLoopStops = (loopStops && loopStops[selectedLoop]) || [];
  return (
    <SwipeableBottomSheet
      open
      overlay={false}
      topShadow={false}
      shadowTip={false}
      bodyStyle={bottomSheetBodyStyle}
      onChange={onBottomSheetChange}
    >
      <BottomSheetContainer>
        <BottomSheetTitle>{selectedLoop}</BottomSheetTitle>
        {selectedLoopStops.map((stopKey) => {
          const stop = stops[stopKey];
          // eta += Math.ceil(Math.random() * 3);
          return (
            <LoopStopsListItem
              key={stop.properties.name}
              tabIndex={0}
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
};

export default LoopStopsBottomSheet;
