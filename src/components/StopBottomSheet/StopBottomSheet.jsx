// Framework and third-party non-ui
import React, { Component } from 'react';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import {
  StopBottomSheetContentWrapper,
  StopImage,
  StopImagePlaceholder,
  ImageLoaderWrapper
} from './StopBottomSheet-styled';

// App components
import { getBottomSheetBodyStyle, BottomSheetContainer, BottomSheetTitle } from '../../utils/commonElements';

// Third-party components (buttons, icons, etc.)
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import Loader from 'calcite-react/Loader';

// JSON

// CSS

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
              <StopImage
                src={imageURL}
                loader={
                  <ImageLoaderWrapper>
                    <Loader sizeRatio={0.5} />
                  </ImageLoaderWrapper>
                }
                imageExpanded={this.state.imageExpanded}
                onClick={this.toggleImageExpanded}
              />
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
