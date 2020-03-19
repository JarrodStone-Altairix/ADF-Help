import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderMenu extends Component {

  render() {
    return (
      <div id="header-menu">
        <div id="header-menu-list">
          <Link exact="true" to="/">Home</Link>
          <Link to="/substitute">Case Substitution</Link>
          <Link to="/formatter">Formatter</Link>
          <Link to="/templater">Templater</Link>
        </div>
        <img id="header-menu-logo" src="logo.png" alt="Altairix" />
      </div>
    );
  }
}

export default HeaderMenu;