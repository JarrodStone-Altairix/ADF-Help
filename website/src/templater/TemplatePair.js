import React, { Component } from 'react';
import './templater.css'

class TemplatePair extends Component {

  constructor(props) {
    super(props)

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleTemplateChange = this.handleTemplateChange.bind(this)
  }

  handleSearchChange(e) {
    this.props.onSearchChange(e, this.props.id)
  }
  handleTemplateChange(e) {
    this.props.onTemplateChange(e, this.props.id)
  }

  render() {
    return (
      <div className="template-pair-root">
        <div className="template-pair-input-wrap"><input className="template-pair-search" type="text" placeholder="Search Symbol" value={this.props.search} onChange={this.handleSearchChange} /> </div>
        <div className="templater-pair-divider"></div>
        <div className="template-pair-input-wrap"><input className="template-pair-template" type="text" placeholder="Template Symbol" value={this.props.template} onChange={this.handleTemplateChange} /></div>
      </div>
    );
  }
}

export default TemplatePair;