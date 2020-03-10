import React from 'react';
import './App.css';
import Menu from './components/Menu'

function App() {
  return (
    <div id="app-root">
      <div id="app-header">
        <Menu />
        <div>Altairix Help Site</div>
        <img src="logo.png" />
      </div>
      <div id="app-workspace"></div>
    </div>
  );
}

export default App;
