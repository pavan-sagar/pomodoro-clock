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
      timerIsRunning: false,
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
            timerSec: 0,
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
            timerSec: 0,
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

  //Do the ticking (reducing the seconds and mins of the timer)
  ticker = () => {
    console.log(this.state.timerMin, this.state.timerSec);

    if (this.state.timerMin == 0 && this.state.timerSec == 0) {
      //Stop the timer at 00:00

      //Once the timer reaches 00:00 , we check if the timer that finished was of 'session'. If so then we set the timer min to the break length min.
      //If the finished timer was of a break session, then we set the timer min to the session length min for the next iteration
      this.setState(
        (state, props) => {
          return { sessionIsRunning: !state.sessionIsRunning };
        },
        () => {
          if (this.state.sessionIsRunning == false) {
            //Session is over, now we should set timer to break length min

            this.setState({ timerMin: this.state.breakLengthMin });
          } else {
            //Break is over, now start session with timer min as session length min set by user
            this.setState({ timerMin: this.state.sessionLengthMin });
          }
        }
      ); //We mark it as false when the session timer reaches 00:00
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
  };

  //Start the timer
  startTimer() {
    if (this.state.timerIsRunning) {
      this.pauseTimer();
      return; //If the start button is pressed twice, it creates another ticker and so time moves faster than a second. Hence this prevention of multiple clicks on start button is required.
    }
    //Make the timer status as running
    this.setState({ timerIsRunning: true });
    this.handleInterval = setInterval(this.ticker, 1000);
  }

  pauseTimer() {
    //Make the timer status as not running
    this.setState({ timerIsRunning: false });
    clearInterval(this.handleInterval);
  }

  resetTimer() {
    this.setState({
      timerMin: 25,
      timerSec: 0,
      sessionLengthMin: 25,
      breakLengthMin: 5,
      timerIsRunning: false,
    });

    clearInterval(this.handleInterval);
  }

  render() {
    let timerStyle =
      this.state.timerMin == 0 ? { color: "red" } : { color: "white" }; //Make time red when last minute is left
    return (
      <div className="App">
        <div className="pomodoro-container">
          <h1>Pomodoro Clock</h1>
          <div className="break-length-container">
            <h2 className="break-header">Break Length</h2>
            <i
              className="fa fa-arrow-down fa-2x"
              onClick={() => {
                if (this.state.timerIsRunning) {
                  //If timer is running, dont allow to change session or break length.
                  return;
                }
                this.changeLength("break", "down");
              }}
            />
            <p className="break-length-minutes">{this.state.breakLengthMin}</p>
            <i
              className="fa fa-arrow-up fa-2x"
              onClick={() => {
                if (this.state.timerIsRunning) {
                  //If timer is running, dont allow to change session or break length
                  return;
                }
                this.changeLength("break", "up");
              }}
            />
          </div>

          <div className="session-length-container">
            <h2 className="session-header">Session Length</h2>
            <i
              className="fa fa-arrow-down fa-2x"
              onClick={() => {
                //If timer is running, dont allow to change session or break length
                if (this.state.timerIsRunning) {
                  return;
                }
                this.changeLength("session", "down");
              }}
            />
            <p className="session-length-minutes">
              {this.state.sessionLengthMin}
            </p>
            <i
              className="fa fa-arrow-up fa-2x"
              onClick={() => {
                if (this.state.timerIsRunning) {
                  //If timer is running, dont allow to change session or break length
                  return;
                }
                this.changeLength("session", "up");
              }}
            />
          </div>

          <div className="session-timer-container">
            <h2 className="session-timer-header">Session</h2>
            <p className="session-timer" style={timerStyle}>
              {this.state.timerMin < 10 //Add extra '0' in timer min and sec if it is a single digit value
                ? "0" + this.state.timerMin
                : this.state.timerMin}{" "}
              :{" "}
              {this.state.timerSec < 10
                ? "0" + this.state.timerSec
                : this.state.timerSec}
            </p>
          </div>

          <div className="button-bar">
            <i className="fa fa-play fa-2x" onClick={this.startTimer} />
            <i className="fa fa-pause fa-2x" onClick={this.pauseTimer} />
            <i className="fa fa-refresh fa-2x" onClick={this.resetTimer} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
