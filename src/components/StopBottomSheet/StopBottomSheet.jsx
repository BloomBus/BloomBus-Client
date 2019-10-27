import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    const { match, stops, onBottomSheetChange } = this.props;
    const { stopKey } = match.params;
    const { name, imageURL } = stops[stopKey].properties;

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
  open: false
};

export default withRouter(StopBottomSheet);
