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
    };

    this.changeLength = this.changeLength.bind(this);
  }

  changeLength(component, direction) {
    if (component == "session") {
      if (direction == "up") {
        this.setState((state, props) => {
          return {
            sessionLengthMin: state.sessionLengthMin + 1,
            timerMin: state.sessionLengthMin + 1,
          };
        });
      } else {
        this.setState((state, props) => {
          if (state.sessionLengthMin == 1) {
            return;
          }
          return {
            sessionLengthMin: state.sessionLengthMin - 1,
            timerMin: state.sessionLengthMin - 1,
          };
        });
      }
    } else {
      if (direction == "up") {
        this.setState((state, props) => {
          return { breakLengthMin: state.breakLengthMin + 1 };
        });
      } else {
        this.setState((state, props) => {
          if (state.breakLengthMin == 1) {
            return;
          }
          return { breakLengthMin: state.breakLengthMin - 1 };
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="pomodoro-container">
          <h1>Pomodoro Clock</h1>
          <div className="break-length-container">
            <h2 className="break-header">Break Length</h2>
            <i
              class="fa fa-arrow-down fa-2x"
              onClick={() => {
                this.changeLength("break", "down");
              }}
            />
            <p className="break-length-minutes">{this.state.breakLengthMin}</p>
            <i
              class="fa fa-arrow-up fa-2x"
              onClick={() => {
                this.changeLength("break", "up");
              }}
            />
          </div>

          <div className="session-length-container">
            <h2 className="session-header">Session Length</h2>
            <i
              class="fa fa-arrow-down fa-2x"
              onClick={() => {
                this.changeLength("session", "down");
              }}
            />
            <p className="session-length-minutes">
              {this.state.sessionLengthMin}
            </p>
            <i
              class="fa fa-arrow-up fa-2x"
              onClick={() => {
                this.changeLength("session", "up");
              }}
            />
          </div>

          <div className="session-timer-container">
            <h2 className="session-timer-header">Session</h2>
            <p className="session-timer">
              {this.state.timerMin} : {this.state.timerSec}
            </p>
          </div>

          <div className="button-bar">
            <i class="fa fa-play fa-2x" />
            <i class="fa fa-pause fa-2x" />
            <i class="fa fa-refresh fa-2x" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
