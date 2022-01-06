import React from 'react';
import { useParams } from 'react-router-dom';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import {
  bottomSheetBodyStyle,
  BottomSheetContainer,
  BottomSheetTitle
} from 'utils/commonElements';

import { Shuttles } from 'types';

interface ShuttleBottomSheetProps {
  shuttles: Shuttles;
  onBottomSheetChange: (open: boolean) => void;
}
const ShuttleBottomSheet: React.FC<ShuttleBottomSheetProps> = ({
  shuttles,
  onBottomSheetChange
}) => {
  const { shuttleID } = useParams<{ shuttleID: string }>();
  const shuttle = shuttles[shuttleID];
  const { loopDisplayName } = shuttle.properties;

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
        <BottomSheetTitle>{`${loopDisplayName} Shuttle`}</BottomSheetTitle>
      </BottomSheetContainer>
    </SwipeableBottomSheet>
  );
};

export default ShuttleBottomSheet;
