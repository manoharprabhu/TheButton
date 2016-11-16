'use strict';

import React from 'react';

require('styles//Digit.css');

let h1 = require('../images/1.png');
let h2 = require('../images/2.png');
let h3 = require('../images/3.png');
let h4 = require('../images/4.png');
let h5 = require('../images/5.png');

class DigitComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if(this.props.hieroglyph === 0) {
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
  } else {
    var imageToUse = null;
    if(this.props.hieroglyph === 1) {
      imageToUse = h1;
    } else if(this.props.hieroglyph === 2) {
      imageToUse = h2;
    } else if(this.props.hieroglyph === 3) {
      imageToUse = h3;
    } else if(this.props.hieroglyph === 4) {
      imageToUse = h4;
    } else if(this.props.hieroglyph === 5) {
      imageToUse = h5;
    }

    return (
      <div className="number-container">
        <img src={imageToUse} width="100%" height="100%" />
      </div>
    );
  }
  }
}

DigitComponent.displayName = 'DigitComponent';

// Uncomment properties you need

DigitComponent.propTypes = {
  displayNumber: React.PropTypes.number,
  numType: React.PropTypes.number,
  hieroglyph: React.PropTypes.number
};
DigitComponent.defaultProps = {
  displayNumber: 0,
  numType: 0,
  hieroglyph: 0
};

export default DigitComponent;
