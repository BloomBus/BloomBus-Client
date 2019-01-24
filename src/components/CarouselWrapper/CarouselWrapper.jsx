import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import LoopsCarousel from '../LoopsCarousel/LoopsCarousel';
import expandPath from './expand.svg';
import './CarouselWrapper.css';

const Wrapper = posed.div({
  expanded: {
    y: 0,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
  collapsed: {
    y: 160,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
});

const ExpandIcon = posed.img({
  expanded: {
    rotate: 0,
  },
  collapsed: {
    rotate: 180,
  },
});

class CarouselWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    return (
      <Wrapper
        className="carousel-wrapper"
        pose={this.state.expanded ? 'expanded' : 'collapsed'}
        style={{ height: this.state.expanded ? 100 : 160 }}
      >
        <button
          type="button"
          className="expand-btn"
          onClick={this.toggleExpanded}
          aria-label={this.state.expanded ? 'Hide' : 'Show'}
        >
          <ExpandIcon src={expandPath} alt="" pose={this.state.expanded ? 'expanded' : 'collapsed'} />
        </button>
        <LoopsCarousel loops={this.props.loops} highlightLoop={index => this.props.highlightLoop(index)} />
      </Wrapper>
    );
  }
}

CarouselWrapper.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightLoop: PropTypes.func.isRequired,
};

export default CarouselWrapper;
