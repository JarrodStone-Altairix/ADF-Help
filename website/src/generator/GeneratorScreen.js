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
      symbols: { symbol: "" },
      search: '',
      text: '',
      out: ''
    }
    this.updateOut = false

    this.handleGeneratorListClick = this.handleGeneratorListClick.bind(this)
    this.handleSymbolChange = this.handleSymbolChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
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
    this.updateOut = true
    var symbols = { ...this.state.symbols }
    symbols[symbol] = e.target.value
    this.setState({ symbols })
  }

  handleSearchChange(e) { this.setState({ search: e.target.value }) }

  componentDidUpdate(prevProps, prevState) {

    if (!this.updateOut || this.state.text.length === "") { return }

    this.updateOut = false
    axios.post("template/apply", {
      text: this.state.text,
      symbols: this.state.symbols,
    })
      .then(rsp => { this.setState({ out: rsp.data.text }) })
      .catch(rsp => { })
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
          <div id="generator-screen-search-cntr" >
            <img src="icons/search-black-24dp.svg" />
            <input type="text" placeholder="Search" onChange={this.handleSearchChange} />
          </div>
          <GeneratorList templates={this.state.templates}
            onItemClick={this.handleGeneratorListClick} search={this.state.search} />
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