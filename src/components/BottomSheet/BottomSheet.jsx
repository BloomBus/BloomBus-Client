/* global */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BottomSheet.css';

class BottomSheet extends Component {
  render() {
    return this.props.isOpen ? (
      <div>
        <h4 className="bottom-sheet__title">{this.props.title}</h4>
        <span className="bottom-sheet__status">{this.props.statusText}</span>
      </div>
    ) : null;
  }
}

BottomSheet.propTypes = {
  title: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default BottomSheet;
