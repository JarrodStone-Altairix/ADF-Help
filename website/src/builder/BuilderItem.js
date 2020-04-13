import React, { Component } from 'react';
import axios from 'axios'

class BuilderItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      itemName: ""
    }

    this.downloadLink = React.createRef()
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  handleItemChange(e) { this.setState({ itemName: e.target.value }) }
  handleItemClick(e) {
    axios.get("builder/" + this.props.endpoint, {
      params: { name: this.state.itemName },
      responseType: 'blob'
    }).then(rsp => {
      this.downloadLink.current.href = window.URL.createObjectURL(new Blob([rsp.data]))
      this.downloadLink.current.setAttribute(
        "download", /filename=(\S+)/.exec(rsp.headers["content-disposition"])[1])
      this.downloadLink.current.click()
    })
  }

  render() {
    return (
      <div className="builder-item-root">
        <div className="builder-item-desc">{this.props.desc}</div>
        <input className="builder-item-name" type="text" placeholder={this.props.placeholder} onChange={this.handleItemChange} />
        <input className="builder-item-button" type="button" value="Build" onClick={this.handleItemClick} />

        <a id="builder-screen-download-link" ref={this.downloadLink} style={{ display: "none" }} href="/">empty</a>
      </div>
    );
  }
}

export default BuilderItem;