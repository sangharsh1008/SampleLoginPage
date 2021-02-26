import React from "react";
import "./App.css";
import Login from "./features/login/LoginContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={Login} />           
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
