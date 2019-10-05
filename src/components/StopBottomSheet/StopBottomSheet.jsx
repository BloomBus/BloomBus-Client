import React, { Component } from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';
import { StopBottomSheetContentWrapper, StopImage, StopImagePlaceholder } from './StopBottomSheet-styled';

class StopBottomSheet extends Component {
  state = {
    imageExpanded: false
  };

  toggleImageExpanded = () => {
    this.setState(prevState => ({
      imageExpanded: !prevState.imageExpanded
    }));
  };

  render() {
    const { open, stop, onBottomSheetChange } = this.props;
    const { name, imageURL } = stop.properties;
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
          <BottomSheetTitle>{name}</BottomSheetTitle>
          <StopBottomSheetContentWrapper>
            {imageURL ? (
              <StopImage src={imageURL} imageExpanded={this.state.imageExpanded} onClick={this.toggleImageExpanded} />
            ) : (
              <StopImagePlaceholder imageExpanded={this.state.imageExpanded} onClick={this.toggleImageExpanded}>
                ?
              </StopImagePlaceholder>
            )}
          </StopBottomSheetContentWrapper>
        </BottomSheetContainer>
      </SwipeableBottomSheet>
    );
  }
}

StopBottomSheet.defaultProps = {
  open: false,
  stop: {
    properties: {
      name: ''
    }
  }
};

export default StopBottomSheet;
