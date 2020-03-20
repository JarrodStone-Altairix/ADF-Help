import React, { Component } from 'react';
import axios from 'axios'
import './templater.css'
import TemplatePair from './TemplatePair';

class TemplaterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      pairs: [
        Array(2).fill(""),
        Array(2).fill(""),
        Array(2).fill(""),
      ],
      out: ''
    }

    this.updateOut = false;

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleTemplateChange = this.handleTemplateChange.bind(this)
    this.handleOutChange = this.handleOutChange.bind(this)
  }

  handleOutChange(e) { this.setState({ out: e.target.value }); }
  handleTextChange(e) { this.setState({ text: e.target.value }); this.updateOut = true }
  handleSearchChange(e, id) {
    this.updateOut = true;
    const newPairs = this.state.pairs.slice()
    newPairs[id][0] = e.target.value
    this.setState({ pairs: newPairs })
  }
  handleTemplateChange(e, id) {
    this.updateOut = true;
    const newPairs = this.state.pairs.slice()
    newPairs[id][1] = e.target.value
    this.setState({ pairs: newPairs })
  }

  componentDidUpdate(prevProps, prevState) {

    if (!this.updateOut || this.state.text.length === 0) {
      return;
    }
    this.updateOut = false

    var symbols = {}
    for (var i = 0; i < this.state.pairs.length; i++) {
      if (this.state.pairs[i][0] !== "" && this.state.pairs[i][1] !== "") {
        symbols[this.state.pairs[i][0]] = this.state.pairs[i][1]
      }
    }
    if (Object.keys(symbols).length === 0) {
      return
    }

    axios.post("template/create", {
      text: this.state.text,
      symbols: symbols,
    })
      .then(rsp => this.setState({ out: rsp.data.text }))
      .catch(rsp => { })
  }

  renderPair(id) {
    return <TemplatePair id={id}
      search={this.state.pairs[id].search}
      template={this.state.pairs[id].template}
      onSearchChange={e => this.handleSearchChange(e, id)}
      onTemplateChange={e => this.handleTemplateChange(e, id)}
    />
  }

  render() {
    return (
      <div id="templater-screen-root">
        <div id="templater-screen-sidebar">
          {this.renderPair(0)}
          {this.renderPair(1)}
          {this.renderPair(2)}
        </div>
        <div className="templater-screen-divider"></div>
        <div id="templater-screen-input-text" className="templater-screen-textarea">
          <textarea className="templater-screen-textarea" placeholder="Text" value={this.state.text} onChange={this.handleTextChange}></textarea>
        </div>
        <div className="templater-screen-divider"></div>
        <div id="templater-screen-output-text" className="templater-screen-textarea">
          <textarea className="templater-screen-textarea" placeholder="Template Text" readOnly value={this.state.out} onChange={this.handleOutChange}></textarea>
        </div>
      </div>
    );
  }
}

export default TemplaterScreen;
