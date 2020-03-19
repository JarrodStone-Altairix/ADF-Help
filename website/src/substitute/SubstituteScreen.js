import React, { Component } from 'react';
import axios from 'axios'
import './substitute.css'

class SubstituteScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      find: '',
      replace: '',
      out: ''
    }

    this.updateOut = false

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFindChange = this.handleFindChange.bind(this)
    this.handleReplaceChange = this.handleReplaceChange.bind(this)
    this.handleOutChange = this.handleOutChange.bind(this)
  }

  handleTextChange(e) { this.setState({ text: e.target.value }); this.updateOut = true }
  handleFindChange(e) { this.setState({ find: e.target.value }); this.updateOut = true }
  handleReplaceChange(e) { this.setState({ replace: e.target.value }); this.updateOut = true }
  handleOutChange(e) { this.setState({ out: e.target.value }); }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.find.length === 0 || this.state.replace.length === 0 || this.state.text.length === 0) {
      return;
    }

    if (this.updateOut) {
      this.updateOut = false
      axios.post("sub/text", {
        text: this.state.text,
        find: this.state.find,
        replace: this.state.replace,
      }).then(rsp => this.setState({ out: rsp.data.text }))
        .catch(rsp => { })
    }
  }

  render() {
    return (
      <div id="substitute-screen-root">
        <div className="substitute-screen-input-wrap"><input id="find" type="text" placeholder="Find" value={this.state.find} onChange={this.handleFindChange} /> </div>
        <div className="substitute-screen-input-wrap"><input id="replace" type="text" placeholder="Replace" value={this.state.replace} onChange={this.handleReplaceChange} /></div>
        <div id="substitute-screen-input-text">
          <textarea className="substitute-screen-textarea" placeholder="Text" value={this.state.text} onChange={this.handleTextChange}></textarea>
        </div>
        <div id="substitute-screen-divider"></div>
        <div id="substitute-screen-output-text">
          <textarea className="substitute-screen-textarea" placeholder="Replace Text" readOnly value={this.state.out} onChange={this.handleOutChange}></textarea>
        </div>
      </div>
    );
  }
}

export default SubstituteScreen;
