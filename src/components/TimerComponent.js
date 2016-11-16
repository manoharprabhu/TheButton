'use strict';

import React from 'react';
import DigitComponent from './/DigitComponent';
import Sound from 'react-sound';

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
      currentSeconds: 5,
      displayMinutes: "108",
      displaySeconds: "00",
      timerObject: null,
      inputNumber: '',
      systemFailureState: false,
      systemFailurePlayPosition: 0
    };
    this.execute = this.execute.bind(this);
    this.loopSystemFailure = this.loopSystemFailure.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
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
    this.setState({systemFailureState: true});

  }

  loopSystemFailure() {
    this.setState({systemFailurePlayPosition: 0});
  }

  resetCounterWithoutIncident() {
    this.setState({
      currentMinutes: 108,
      currentSeconds: 0,
      displayMinutes: "108",
      displaySeconds: "00",
      timerObject: null,
      inputNumber: '',
      systemFailureState: false
    });
    this.stopTimer();
    this.startTimer();
  }

  execute(event) {
    if (event.charCode === 13) {
      if (this.state.currentMinutes < 4) {
        let value = this.refs.inputKeyboard.value.trim();
        if (value === '4 8 15 16 23 42') {
          this.resetCounterWithoutIncident();
        }
      }
      event.preventDefault();
      this.refs.inputKeyboard.value = '';
    }
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
        <div className={this.state.systemFailureState ? 'timer-wrapper vibrate' : 'timer-wrapper'}>
          {(this.state.displayMinutes).split("").map(function(item, index) {
            let num = parseInt(item);
            return <DigitComponent displayNumber={num} numType={1} key={index}/>
          })}
          <div className="empty"/> {(this.state.displaySeconds).split("").map(function(item, index) {
            let num = parseInt(item);
            return <DigitComponent displayNumber={num} numType={0} key={index}/>
          })}
        </div>
        <textarea className="input-keyboard" placeholder="$" ref="inputKeyboard" onKeyPress={this.execute} ></textarea>
        <div>
        <Sound
          url="failure.wav"
          playStatus={this.state.systemFailureState === true ? Sound.status.PLAYING : Sound.status.STOPPED}
          position={this.state.systemFailurePlayPosition}
          onFinishedPlaying={this.loopSystemFailure}
        />
        </div>
      </div>
    );
  }
}
TimerComponent.displayName = 'TimerComponent'; // Uncomment properties you need

TimerComponent.propTypes = {};

TimerComponent.defaultProps = {}

export default TimerComponent;
