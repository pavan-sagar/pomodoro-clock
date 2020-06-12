import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLengthMin: 5,
      sessionLengthMin: 25,
      timerMin: 25,
      timerSec: 0,
      timerIsRunning: true,
      sessionIsRunning: true,
    };

    this.changeLength = this.changeLength.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

     //setInterval reference
      this.handleInterval = null;
   
  }

  

  //Handle the change in minutes of Break or Session length
  changeLength(component, direction) {
    if (component == "session") {
      if (direction == "up") {
        this.setState((state, props) => {
          return {
            sessionLengthMin: state.sessionLengthMin + 1,
            timerMin: state.sessionLengthMin + 1, //The same session length should reflect in timer value of Min.
          };
        });
      } else {
        this.setState((state, props) => {
          if (state.sessionLengthMin == 1) {
            //While decreasing, the min should not be less than one.
            return;
          }
          return {
            sessionLengthMin: state.sessionLengthMin - 1,
            timerMin: state.sessionLengthMin - 1,
          };
        });
      }
    } else {
      // If the 'Break Length' arrow is pressed
      if (direction == "up") {
        this.setState((state, props) => {
          return { breakLengthMin: state.breakLengthMin + 1 };
        });
      } else {
        this.setState((state, props) => {
          if (state.breakLengthMin == 1) {
            //While decreasing, the min should not be less than one.
            return;
          }
          return { breakLengthMin: state.breakLengthMin - 1 };
        });
      }
    }
  }

  

  //Start the timer
  startTimer() {

    const ticker = () => {
      if (this.state.timerIsRunning && this.state.timerMin >= 0) {
        if (this.state.timerMin == 0 && this.state.timerSec == 0) {
          //Stop the timer at 00:00, now set timer min to break min and again start the timer (For Break)
          return;
        }

      
        this.setState((state, props) => {
          if (state.timerSec == 0) {
            //If previous second was 0 then next decrement should bring it to 59.
            return {
              timerSec: 59,
              timerMin: state.timerMin - 1,
            };
          }
          return { timerSec: state.timerSec - 1 };
        });
      
      }
    }
    
   
    this.handleInterval = setInterval(ticker, 1000);

    
    
    
  }

  pauseTimer() {
    clearInterval(this.handleInterval);
  }

  resetTimer() {
    this.setState({
      timerMin: this.state.sessionLengthMin,
    timerSec:0});

  }
  render() {
    return (
      <div className="App">
        <div className="pomodoro-container">
          <h1>Pomodoro Clock</h1>
          <div className="break-length-container">
            <h2 className="break-header">Break Length</h2>
            <i
              className="fa fa-arrow-down fa-2x"
              onClick={() => {
                this.changeLength("break", "down");
              }}
            />
            <p className="break-length-minutes">{this.state.breakLengthMin}</p>
            <i
              className="fa fa-arrow-up fa-2x"
              onClick={() => {
                this.changeLength("break", "up");
              }}
            />
          </div>

          <div className="session-length-container">
            <h2 className="session-header">Session Length</h2>
            <i
              className="fa fa-arrow-down fa-2x"
              onClick={() => {
                this.changeLength("session", "down");
              }}
            />
            <p className="session-length-minutes">
              {this.state.sessionLengthMin}
            </p>
            <i
              className="fa fa-arrow-up fa-2x"
              onClick={() => {
                this.changeLength("session", "up");
              }}
            />
          </div>

          <div className="session-timer-container">
            <h2 className="session-timer-header">Session</h2>
            <p className="session-timer">
              {this.state.timerMin < 10 ?  '0'+ this.state.timerMin : this.state.timerMin} : {this.state.timerSec < 10 ?  '0'+ this.state.timerSec : this.state.timerSec}
            </p>
          </div>

          <div className="button-bar">
            <i className="fa fa-play fa-2x" onClick={this.startTimer} />
            <i className="fa fa-pause fa-2x" onClick={this.pauseTimer} />
            <i className="fa fa-refresh fa-2x" onClick={this.resetTimer}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
