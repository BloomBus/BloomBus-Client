declare module 'react-swipeable-bottom-sheet' {
  interface ReactSwipeableBottomSheetProps {
    open: boolean;
    overlay?: boolean;
    topShadow?: boolean;
    shadowTip?: boolean;
    bodyStyle?: React.CSSProperties;
    onChange?: (open: boolean) => void;
  }
  export default class ReactSwipeableBottomSheet extends React.Component<ReactSwipeableBottomSheetProps> {}
}
