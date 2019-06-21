import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import Carousel from 'nuka-carousel';
import tinycolor from 'tinycolor2';
import posed from 'react-pose';

import PagingDots from './PagingDots';
import StopsList from '../StopsList/StopsList';
import CarouselMode from './CarouselMode.ts';
import expandPath from '../../images/expand.svg';
import './LoopsCarousel.css';

// See CarouselMode.ts
const ModeIcon = posed.img({
  0: {
    rotate: 180,
  },
  1: {
    rotate: 90,
  },
  2: {
    rotate: 0,
  },
});

const PagingDotsContainer = ({ node, ...props }) => {
  if (!node) return null;
  return createPortal(<PagingDots {...props} />, node);
};

class LoopsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: CarouselMode.Collapsed,
    };

    this.pagingDotsContainerRef = React.createRef();

    this.onModeButtonClick = this.onModeButtonClick.bind(this);
    this.onLoopClick = this.onLoopClick.bind(this);
    this.onBottomSheetChange = this.onBottomSheetChange.bind(this);
  }

  onModeButtonClick() {
    this.setState(prevState => ({
      mode: prevState.mode === CarouselMode.Expanded ? CarouselMode.Collapsed : CarouselMode.Expanded,
    }));
  }

  onLoopClick() {
    if (this.state.mode === CarouselMode.Expanded) return;
    this.setState({
      mode: CarouselMode.Expanded,
    });
  }

  onBottomSheetChange(isOpen) {
    this.setState({
      mode: isOpen ? CarouselMode.Expanded : CarouselMode.Collapsed,
    });
  }

  render() {
    return (
      <Fragment>
        <div ref={this.pagingDotsContainerRef} className="paging-dots-container" />
        <SwipeableBottomSheet
          overflowHeight={110}
          marginTop={50}
          topShadow={false}
          overlay={false}
          shadowTip
          scrollTopAtClose
          bodyStyle={{
            backgroundColor: 'none',
          }}
          defaultOpen
          open={this.state.mode === CarouselMode.Expanded}
          onChange={this.onBottomSheetChange}
        >
          <div className="loops-carousel-wrapper">
            <button
              type="button"
              className="mode-btn"
              onClick={this.onModeButtonClick}
              aria-label={this.state.mode === CarouselMode.Collapsed ? 'Hide' : 'Show'}
            >
              <ModeIcon src={expandPath} alt="" pose={this.state.mode.toString()} />
            </button>
            <Carousel
              swiping
              dragging
              afterSlide={(slideIndex) => { this.props.onSelectedLoopChanged(slideIndex); }}
              className="carousel"
              slideWidth={1.0}
              heightMode="max"
              easing="easeQuadOut"
              renderCenterLeftControls={({ previousSlide }) => null}
              renderCenterRightControls={({ nextSlide }) => null}
              renderBottomCenterControls={props => <PagingDotsContainer node={this.pagingDotsContainerRef.current} {...props} />}
            >
              {
            this.props.loops.map(loop => (
              <div
                key={loop.properties.name}
                className="carousel__card"
                role="button"
                tabIndex="0"
                onClick={this.onLoopClick}
                onKeyDown={this.onLoopClick}
                style={{
                  backgroundImage: `linear-gradient(to right, ${loop.properties.color}, ${tinycolor(loop.properties.color).spin(15).toHexString()})`,
                }}
              >
                <div className="carousel__card__head">
                  <div className="carousel__card__notch" />
                  <span className="carousel__card__name">{loop.properties.name}</span>
                </div>
                <StopsList stops={this.props.stops} />
              </div>
            ))
          }
            </Carousel>
          </div>
        </SwipeableBottomSheet>
      </Fragment>
    );
  }
}

LoopsCarousel.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedLoopChanged: PropTypes.func.isRequired,
};

export default LoopsCarousel;
