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
    this.alarmAudio = new Audio('alarm.mp3');
    this.beepAudio = new Audio('beep.mp3');
    this.systemFailureAudio = new Audio('failure.wav');
    this.state = {
      currentMinutes: 108,
      currentSeconds: 0,
      displayMinutes: "108",
      displaySeconds: "00",
      timerObject: null,
      inputNumber: '',
      systemFailureState: false,
      systemFailureObject: null,
      slowBeepState: false,
      slowBeepObject: null,
      slowAlarmState: false,
      slowAlarmObject: null,
      fastAlarmState: false,
      fastAlarmObject: null
    };
    this.execute = this.execute.bind(this);
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
    this.setState({systemFailureState: true, beepState: false, alarmState: false});
    this.systemFailureAudio.play();
    var sysFail = setInterval(function() {
      this.systemFailureAudio.play();
    }.bind(this), 2000);
    this.setState({systemFailureObject: sysFail});
  }

  resetCounterWithoutIncident() {
    clearInterval(this.state.systemFailureObject);
    clearInterval(this.state.slowBeepObject);
    clearInterval(this.state.slowAlarmObject);
    clearInterval(this.state.fastAlarmObject);
    this.setState({
      currentMinutes: 108,
      currentSeconds: 0,
      displayMinutes: "108",
      displaySeconds: "00",
      timerObject: null,
      inputNumber: '',
      systemFailureState: false,
      systemFailureObject: null,
      slowBeepState: false,
      slowAlarmState: false,
      fastAlarmState: false
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

  startSlowBeep() {
    if (this.state.slowBeepState === false) {
      this.beepAudio.play();
      var slBeep = setInterval(function() {
        this.beepAudio.play();
      }.bind(this), 2000);
      this.setState({slowBeepObject: slBeep, slowBeepState: true});
    }
  }

  stopSlowBeep() {
    clearInterval(this.state.slowBeepObject);
    this.setState({slowBeepState: false});
  }

  startSlowAlarm() {
    if (this.state.slowAlarmState === false) {
      this.alarmAudio.play();

      var slObj = setInterval(function() {
        this.alarmAudio.play();
      }.bind(this), 2000);
      this.setState({slowAlarmObject: slObj, slowAlarmState: true});
    }
  }

  stopSlowAlarm() {
    clearInterval(this.state.slowAlarmObject);
    this.setState({slowAlarmState: false});
  }

  startFastAlarm() {
    if (this.state.fastAlarmState === false) {
      this.alarmAudio.play();
      var fsObj = setInterval(function() {
        this.alarmAudio.play();
      }.bind(this), 1000);
      this.setState({fastAlarmObject: fsObj, fastAlarmState: true});
    }
  }

  stopFastAlarm() {
    clearInterval(this.state.fastAlarmObject);
    this.setState({fastAlarmState: false});
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
      this.stopFastAlarm();
      this.systemFailure();
      return;
    }

    if (curMin <= 0 && curSec <= 10) {
      this.stopSlowAlarm();
      this.startFastAlarm();
      return;
    }

    if (curMin <= 0 && curSec <= 59) {
      this.stopSlowBeep();
      this.startSlowAlarm();
      return;
    }

    if (curMin < 4) {
      this.startSlowBeep();
      return;
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
        <div className={this.state.systemFailureState
          ? 'timer-wrapper vibrate'
          : 'timer-wrapper'}>
          {this.state.systemFailureState
            ? (
              <div>
                <DigitComponent hieroglyph={1} key={1}/>
                <DigitComponent hieroglyph={2} key={2}/>
                <DigitComponent hieroglyph={3} key={3}/>
                <DigitComponent hieroglyph={4} key={4}/>
                <DigitComponent hieroglyph={5} key={5}/>
              </div>
            )
            : (
              <div>
                {(this.state.displayMinutes).split("").map(function(item, index) {
                  let num = parseInt(item);
                  return <DigitComponent displayNumber={num} numType={1} key={index}/>
                })}
                <div className="empty"/> {(this.state.displaySeconds).split("").map(function(item, index) {
                  let num = parseInt(item);
                  return <DigitComponent displayNumber={num} numType={0} key={index}/>
                })}
              </div>
            )
}
        </div>
        <textarea className="input-keyboard" placeholder="$" ref="inputKeyboard" onKeyPress={this.execute}></textarea>
        <div></div>
      </div>
    );
  }
}
TimerComponent.displayName = 'TimerComponent'; // Uncomment properties you need

TimerComponent.propTypes = {};

TimerComponent.defaultProps = {}

export default TimerComponent;
