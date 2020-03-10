import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack'
import './App.css';
import Menu from './Menu'
import SubstituteScreen from './substitute/SubstituteScreen';
import FormatterScreen from './formatter/FormatterScreen';

// const Stack = createStackNavigator();

function App() {
  return (
    <div id="app-root">
      <div id="app-header">
        <Menu />
        <div>Altairix Help Site</div>
        <img src="logo.png" alt="Altairix" />
      </div>
      <div id="app-workspace">
        <SubstituteScreen />
        <FormatterScreen />
      </div>
    </div>
  );
}

export default App;
