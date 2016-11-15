'use strict';

import React from 'react';
import DigitComponent from './/DigitComponent';

require('styles//Timer.css');

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    /**
    * currentMinutes and currentSeconds store the numerical value of the current time.
    * displayMinutes and displaySeconds store the formatted number as string that has to be displayed
    **/
    this.state = {
      currentMinutes: 0,
      currentSeconds: 10,
      displayMinutes: "108",
      displaySeconds: "00",
      timerObject: null
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    if (this.state.timerObject) {
      return;
    }
    var timerObject = setInterval(function() {
      this.decrementTime();
    }.bind(this), 1000);
    this.setState({timerObject: timerObject});
  }

  stopTimer() {
    var timerObject = this.state.timerObject;
    clearInterval(timerObject);
  }

  systemFailure() {
    /**
    * Stop timer
    * Change timers to hieroglyphs
    * play system failure sound
    */
    this.stopTimer();

  }

  decrementTime() {
    let curSec = this.state.currentSeconds;
    let curMin = this.state.currentMinutes;
    curSec--;
    if (curSec < 0) {
      curSec = 59;
      curMin--;
    }
    this.setState({currentMinutes: curMin, currentSeconds: curSec});
    this.adjustDisplayFormatted();
    if (curSec <= 0 && curMin <= 0) {
      this.systemFailure();
    }
  }

  adjustDisplayFormatted() {
    let curSec = this.state.currentSeconds;
    let curMin = this.state.currentMinutes;

    this.setState({
      displayMinutes: "" + curMin,
      displaySeconds: "" + curSec
    });

    if (curSec < 10) {
      this.setState({
        displaySeconds: "0" + curSec
      });
    }

    if (curMin < 100) {
      this.setState({
        displayMinutes: "0" + curMin
      });
    }
    if (curMin < 10) {
      this.setState({
        displayMinutes: "00" + curMin
      });
    }
  }

  render() {
    return (
      <div>
        <div className="timer-wrapper">
          {(this.state.displayMinutes).split("").map(function(item, index) {
            let num = parseInt(item);
            return <DigitComponent displayNumber={num} key={index}/>
          })}
          <div className="empty"/> {(this.state.displaySeconds).split("").map(function(item, index) {
            let num = parseInt(item);
            return <DigitComponent displayNumber={num} key={index}/>
          })}
        </div>
        <textarea className="input-keyboard" placeholder="$"></textarea>
      </div>
    );
  }
}
TimerComponent.displayName = 'TimerComponent'; // Uncomment properties you need

TimerComponent.propTypes = {};

TimerComponent.defaultProps = {}

export default TimerComponent;
