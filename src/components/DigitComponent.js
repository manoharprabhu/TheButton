'use strict';

import React from 'react';

require('styles//Digit.css');

class DigitComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={this.props.numType === 0
        ? 'number-container black'
        : 'number-container white'}>
        <div className="number-value">{this.props.displayNumber}</div>
        <div className={this.props.numType === 0
          ? 'black-number-top-flap'
          : 'white-number-top-flap'}></div>
        <div className={this.props.numType === 0
          ? 'black-number-bottom-flap'
          : 'white-number-bottom-flap'}></div>
      </div>
    );
  }
}

DigitComponent.displayName = 'DigitComponent';

// Uncomment properties you need

DigitComponent.propTypes = {
  displayNumber: React.PropTypes.number,
  numType: React.PropTypes.number
};
DigitComponent.defaultProps = {
  displayNumber: 0,
  numType: 0
};

export default DigitComponent;
