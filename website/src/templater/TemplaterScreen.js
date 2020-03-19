import React, { Component } from 'react';
import './templater.css'
import TemplatePair from './TemplatePair';

class TemplaterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      pairs: [
        { search: "", template: "" },
        { search: "", template: "" },
        { search: "", template: "" },
      ],
      out: ''
    }

    this.updateOut = false

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleTemplateChange = this.handleTemplateChange.bind(this)
    this.handleOutChange = this.handleOutChange.bind(this)
  }

  handleOutChange(e) { this.setState({ out: e.target.value }); }
  handleTextChange(e) { this.setState({ text: e.target.value }); this.updateOut = true }
  handleSearchChange(e, id) {
    const newPairs = this.state.pairs.slice()
    newPairs[id].search = e.target.value
    this.setState({ pairs: newPairs })
    this.updateOut = true
  }
  handleTemplateChange(e, id) {
    const newPairs = this.state.pairs.slice()
    newPairs[id].template = e.target.value
    this.setState({ pairs: newPairs })
    this.updateOut = true
  }

  componentDidUpdate(prevProps, prevState) {

    if (!this.updateOut || this.state.text.length === 0) { return; }
    if (this.updateOut) {
      this.updateOut = false
      this.updateOutput()
    }
  }

  updateOutput() {

    console.log(this.state)
    // axios.post("sub/text", {
    //   text: this.state.text,
    //   find: this.state.find,
    //   replace: this.state.replace,
    // }).then(rsp => this.setState({ out: rsp.data.text }))
    //   .catch(rsp => { })
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
