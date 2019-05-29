import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import tinycolor from 'tinycolor2';
import posed from 'react-pose';

import StopsList from '../StopsList/StopsList';
import CarouselMode from './CarouselMode.ts';
import expandPath from '../../images/expand.svg';
import './LoopsCarousel.css';

// See CarouselMode.ts
const PosedWrapper = posed.div({
  0: { // Collapsed
    height: 110,
    delayChildren: 200,
    staggerChildren: 1000,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
  1: { // Expanded
    height: 400,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
  2: { // Hidden
    height: 0,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
});

const ModeIcon = posed.img({
  0: {
    rotate: 0,
  },
  1: {
    rotate: 90,
  },
  2: {
    rotate: 180,
  },
});

class LoopsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: CarouselMode.Collapsed,
    };

    this.onModeButtonClick = this.onModeButtonClick.bind(this);
    this.onLoopClick = this.onLoopClick.bind(this);
  }

  onModeButtonClick() {
    let newMode;
    switch (this.state.mode) {
      case CarouselMode.Expanded:
        newMode = CarouselMode.Collapsed;
        break;
      case CarouselMode.Collapsed:
        newMode = CarouselMode.Hidden;
        break;
      case CarouselMode.Hidden:
        newMode = CarouselMode.Collapsed;
        break;
      default:
        newMode = CarouselMode.Collapsed;
        break;
    }
    this.setState({
      mode: newMode,
    });
  }

  onLoopClick() {
    if (this.state.mode === CarouselMode.Expanded) return;
    this.setState({
      mode: CarouselMode.Expanded,
    });
  }

  render() {
    return (
      <PosedWrapper
        className="loops-carousel-wrapper"
        pose={this.state.mode.toString()}
      >
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
              >
                <div
                  className={`carousel__card__head ${this.state.mode === CarouselMode.Expanded ? 'carousel__card__head--expanded' : ''}`}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${loop.properties.color}, ${tinycolor(loop.properties.color).spin(15).toHexString()})`,
                  }}
                >
                  <span className="carousel__card__name">{loop.properties.name}</span>
                </div>
                {this.state.mode === CarouselMode.Expanded && <StopsList stops={this.props.stops} />}
              </div>
            ))
          }
        </Carousel>
      </PosedWrapper>
    );
  }
}

LoopsCarousel.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedLoopChanged: PropTypes.func.isRequired,
};

export default LoopsCarousel;
