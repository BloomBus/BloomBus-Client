import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import LoopsCarousel from '../LoopsCarousel/LoopsCarousel';
import expandPath from '../../images/expand.svg';
import './CarouselWrapper.css';
import CarouselMode from './CarouselMode.ts';
import StopsCarousel from '../StopsCarousel/StopsCarousel';

const Wrapper = posed.div({
  expanded: {
    y: -400,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
  collapsed: {
    y: 0,
    transition: {
      default: { ease: 'easeOut', duration: 150 },
    },
  },
  hidden: {
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
      mode: CarouselMode.Loops,
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
        {(this.state.mode === CarouselMode.Loops
          ? (
            <LoopsCarousel
              loops={this.props.loops}
              onSelectedLoopChanged={index => this.props.onSelectedLoopChanged(index)}
              onClick={() => { this.setState({ mode: CarouselMode.Expanded }); }}
            />
          )
          : <StopsCarousel stops={this.props.stops} />
        )}
      </Wrapper>
    );
  }
}

CarouselWrapper.propTypes = {
  loops: PropTypes.arrayOf(PropTypes.object).isRequired,
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedLoopChanged: PropTypes.func.isRequired,
};

export default CarouselWrapper;
