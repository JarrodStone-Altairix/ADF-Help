import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HeaderMenu from './home/HeaderMenu'
import Home from './home/Home';
import './index.css';
import SubstituteScreen from './substitute/SubstituteScreen';
import FormatterScreen from "./formatter/FormatterScreen";
import TemplaterScreen from './templater/TemplaterScreen';
import GeneratorScreen from './generator/GeneratorScreen';
import BuilderScreen from './builder/BuilderScreen';

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
              <Route path="/generator" component={GeneratorScreen} />
              <Route path="/builder" component={BuilderScreen} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// Using material design icons, rounded style, 24dp https://material.io/resources/icons/?style=round
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
