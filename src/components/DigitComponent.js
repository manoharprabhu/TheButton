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
      <div className="number-container black">
        <div className="number-value">{this.props.displayNumber}</div>
        <div className="black-number-top-flap"></div>
        <div className="black-number-bottom-flap"></div>
      </div>
    );
  }
}

DigitComponent.displayName = 'DigitComponent';

// Uncomment properties you need

DigitComponent.propTypes = {
  displayNumber: React.PropTypes.number
};
DigitComponent.defaultProps = {
  displayNumber: 0
};

export default DigitComponent;
