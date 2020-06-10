import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakMin: 5,
      sessionMin: 25,
    };
  }
  render() {
    return (
      <div className="App">
        <div className="pomodoro-container">
          <h1>Pomodoro Clock</h1>
          <div className="break-container">
            <h2 className="break-header">Break Length</h2>
            <i class="fa fa-arrow-down fa-2x" />
            <p className="break-minutes">{this.state.breakMin}</p>
            <i class="fa fa-arrow-up fa-2x" />
          </div>

          <div className="session-container">
            <h2 className="session-header">Session Length</h2>
            <i class="fa fa-arrow-down fa-2x" />
            <p className="session-minutes">{this.state.sessionMin}</p>
            <i class="fa fa-arrow-up fa-2x" />
          </div>
          <h2 className="session-timer-header">Session</h2>
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
