import React, { Component } from 'react';
import BuilderItem from './BuilderItem';
import './builder.css';

class BuilderScreen extends Component {

  render() {
    return (
      <div id="builder-screen-root">
        <BuilderItem
          desc="Create a package with a given name. This creates the Common, Sync, Server, Async and GWT sub-packages"
          placeholder="Package Name"
          endpoint="package"
        />
      </div>
    );
  }
}

export default BuilderScreen;