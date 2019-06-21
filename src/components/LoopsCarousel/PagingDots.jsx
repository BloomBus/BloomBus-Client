import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getIndexes(count, inc) {
  const arr = [];
  for (let i = 0; i < count; i += inc) {
    arr.push(i);
  }
  return arr;
}

function getListStyles() {
  return {
    position: 'relative',
    margin: 0,
    padding: 0,
  };
}

function getListItemStyles() {
  return {
    listStyleType: 'none',
    display: 'inline-block',
  };
}

function getButtonStyles(active) {
  return {
    border: 0,
    background: 'transparent',
    color: 'white',
    cursor: 'pointer',
    paddingLeft: 10,
    paddingRight: 10,
    outline: 0,
    fontSize: 24,
    opacity: active ? 1 : 0.5,
  };
}

class PagingDots extends Component {
  render() {
    const indexes = getIndexes(
      this.props.slideCount,
      this.props.slidesToScroll,
    );
    return (
      <ul style={getListStyles()}>
        {indexes.map(index => (
          <li style={getListItemStyles()} key={index}>
            <button
              type="button"
              style={getButtonStyles(this.props.currentSlide === index)}
              onClick={this.props.goToSlide.bind(null, index)}
            >
                &bull;
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

PagingDots.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  goToSlide: PropTypes.func.isRequired,
};

export default PagingDots;
