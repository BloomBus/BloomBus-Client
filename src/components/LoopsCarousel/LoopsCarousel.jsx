import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import tinycolor from 'tinycolor2';

class LoopsCarousel extends Component {
  render() {
    return (
      <Carousel
        swiping
        dragging
        afterSlide={(slideIndex) => { this.props.highlightLoop(slideIndex); }}
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
              style={{
                backgroundImage: `linear-gradient(to right, ${loop.properties.color}, ${tinycolor(loop.properties.color).spin(15).toHexString()})`,
                filter: 'saturate(80%)',
                boxShadow: '0 -3px 8px rgba(0,0,0,0.15)',
              }}
            >
              <span className="carousel__card__name">{loop.properties.name}</span>
            </div>
          ))
        }
      </Carousel>
    );
  }
}

LoopsCarousel.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightLoop: PropTypes.func.isRequired,
};

export default LoopsCarousel;
