import React, { Component } from 'react';
import axios from 'axios'

class BuilderScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      packageName: ""
    }

    this.downloadLink = React.createRef()
    this.handlePackageClick = this.handlePackageClick.bind(this)
    this.handlePackageChange = this.handlePackageChange.bind(this)
  }

  handlePackageChange(e) { this.setState({ packageName: e.target.value }) }
  handlePackageClick(e) {
    axios.get("builder/package", {
      params: { name: this.state.packageName },
      responseType: 'blob'
    }).then(rsp => {
      this.downloadLink.current.href = window.URL.createObjectURL(new Blob([rsp.data]))
      var filename = /filename=(\S+)/.exec(rsp.headers["content-disposition"])[1]
      this.downloadLink.current.setAttribute("download", "package.zip")
      this.downloadLink.current.click()
    })
  }

  render() {
    return (
      <div id="builder-screen-root">
        <input type="text" placeholder="Package Name" onChange={this.handlePackageChange} />
        <input type="button" value="Package" onClick={this.handlePackageClick} />

        <a id="builder-screen-download-link" ref={this.downloadLink} style={{ display: "none" }} />
      </div>
    );
  }
}

export default BuilderScreen;