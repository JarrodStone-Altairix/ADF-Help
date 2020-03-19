import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderMenu from './home/HeaderMenu'
import Home from './home/Home';
import './App.css';
import SubstituteScreen from './substitute/SubstituteScreen';
import FormatterScreen from "./formatter/FormatterScreen";
import TemplaterScreen from './templater/TemplaterScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-root">
          <HeaderMenu />
          <div id="app-workspace">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/substitute" component={SubstituteScreen} />
              <Route path="/formatter" component={FormatterScreen} />
              <Route path="/templater" component={TemplaterScreen} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
