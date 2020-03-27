import React, { Component } from 'react';
import axios from 'axios'
import './formatter.css'
import FormatterSubpanel from './FormatterSubpanel';

class FormatterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      format: 'table',
      text: '',
      pivot: "\\.\\w+\\(",
    }

    this.handleFormatChange = this.handleFormatChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFormatClick = this.handleFormatClick.bind(this)
    this.handlePivotChange = this.handlePivotChange.bind(this)
  }

  handleFormatChange(e) { this.setState({ format: e.target.value }); }
  handlePivotChange(e) { this.setState({ pivot: e.target.value }); }
  handleTextChange(e) { this.setState({ text: e.target.value }); }

  handleFormatClick(e) {

    if (this.state.format === "table") {
      axios.post("fmt/table", {
        text: this.state.text
      }).then(rsp => this.setState({ text: rsp.data.text }))
        .catch(rsp => { })
    }
    else if (this.state.format === "pivot") {
      axios.post("fmt/pivot", {
        text: this.state.text,
        pivot: this.state.pivot
      }).then(rsp => this.setState({ text: rsp.data.text }))
        .catch(rsp => { })
    }
  }

  render() {
    return (
      <div id="formatter-screen-root">
        <div id="formatter-screen-controls">
          <div id="formatter-screen-control-main" className="formatter-screen-control-item">
            <select value={this.state.format} onChange={this.handleFormatChange}>
              <option value="table">Table</option>
              <option value="pivot">Pivot</option>
            </select>
            <input type="button" value="Format" onClick={this.handleFormatClick} />
          </div>
          <div id="formatter-screen-pivot-wrap" className="formatter-screen-control-item">
            <FormatterSubpanel type={this.state.format}
              pivot={this.state.pivot} onPivotChange={this.handlePivotChange} />
            {/* <div>Pivot Regex:<input type="text" value={this.state.pivot} onChange={this.handlePivotChange} /></div> */}
          </div>
        </div>
        <div style={{ height: "5px", backgroundColor: "var(--colour-primary)" }}></div>
        <textarea id="formatter-screen-text" value={this.state.text} onChange={this.handleTextChange} />
      </div >
    );
  }
}

export default FormatterScreen;
