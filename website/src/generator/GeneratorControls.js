import React, { Component } from 'react';

class GeneratorControls extends Component {

  render() {
    return (
      <div className="generator-controls-root">
        {
          this.props.symbols.map((x, i) => {
            return (
              <div key={i} className="generator-controls-symbols-wrap">
                <div className="generator-controls-symbol">{x}</div>
                <input type="text" placeholder="Substitution Value"
                  onChange={e => this.props.onSymbolChange(e, x)} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default GeneratorControls;
