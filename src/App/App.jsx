import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PaneValidationData from "./components/PaneValidationData/PaneValidationData";
import PaneOriginalInfo from "./components/PaneOriginalInfo/PaneOriginalInfo";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="src-panes">
          <PaneOriginalInfo className="column-panes" />
          <PaneValidationData className="column-panes" />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
