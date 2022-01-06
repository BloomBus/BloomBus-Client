// Framework and third-party non-ui
import React from 'react';

// Local helpers/utils/modules
import {
  bottomSheetBodyStyle,
  BottomSheetContainer,
  BottomSheetTitle
} from '../../utils/commonElements';

// Component specific modules (Component-styled, etc.)
import {
  LoopListItem,
  LoopListItemLeftSide,
  LoopListItemRightSide,
  LoopName
} from './LoopsBottomSheet-styled';

// App components, types
import { Loop, LoopKey, Shuttles } from 'types';

// Third-party components (buttons, icons, etc.)
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import MoonIcon from 'calcite-ui-icons-react/MoonIcon';

interface LoopsBottomSheetProps {
  loops: Loop[];
  shuttles?: Shuttles;
  onBottomSheetChange: (open: boolean) => void;
  onLoopSelect: (loopKey: LoopKey) => void;
}
const LoopsBottomSheet: React.FC<LoopsBottomSheetProps> = ({
  loops,
  shuttles,
  onBottomSheetChange,
  onLoopSelect
}) => {
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
              tabIndex={0}
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
};

export default LoopsBottomSheet;
