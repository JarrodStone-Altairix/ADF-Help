import React, { Component } from 'react';
import axios from 'axios'
import './generator.css'
import GeneratorList from './GeneratorList';
import GeneratorControls from './GeneratorControls';

class GeneratorScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      templates: [],
      symbols: {},
      text: '',
      out: ''
    }

    this.handleGeneratorListClick = this.handleGeneratorListClick.bind(this)
    this.handleSymbolChange = this.handleSymbolChange.bind(this)
  }

  handleGeneratorListClick(e, id) {
    axios.post("gen/template/read", { template: this.state.templates[id] })
      .then(rsp => {
        var symbols = {}
        for (const s of rsp.data.symbols) { symbols[s] = '' }
        this.setState({ text: rsp.data.text, symbols: symbols });
      })
      .catch(rsp => { })
  }

  handleSymbolChange(e, symbol) {
    var symbols = { ...this.state.symbols }
    symbols[symbol] = e.target.value
    this.setState({ symbols })
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.out !== this.state.out) { return }

    axios.post("template/apply", {
      text: this.state.text,
      symbols: this.state.symbols,
    })
      .then(rsp => { this.setState({ out: rsp.data.text }) })
  }

  componentDidMount() {
    axios.post("gen/template/list")
      .then(rsp => { this.setState({ templates: rsp.data.templates }) })
      .catch(rsp => { })
  }

  render() {
    return (
      <div id="generator-screen-root">
        <div id="generator-screen-sidebar">
          <GeneratorControls symbols={Object.keys(this.state.symbols)}
            onSymbolChange={this.handleSymbolChange} />
          <GeneratorList templates={this.state.templates} onItemClick={this.handleGeneratorListClick} />
        </div>
        <div className="generator-screen-divider"></div>
        <div id="generator-screen-input-text" className="generator-screen-textarea">
          <textarea className="generator-screen-textarea" placeholder="Text" readOnly value={this.state.text} />
        </div>
        <div className="generator-screen-divider"></div>
        <div id="generator-screen-output-text" className="generator-screen-textarea">
          <textarea className="generator-screen-textarea" placeholder="Template Text" readOnly value={this.state.out} />
        </div>
      </div>
    );
  }
}

export default GeneratorScreen;