import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FormatterSubpanel extends Component {

  render() {
    if (this.props.type === "pivot") {
      return (<div id="formatter-subpanel-pivot">
        <div>Pivot Regex</div>
        <input type="text" value={this.props.pivot} onChange={this.props.onPivotChange} />
      </div>);
    }
    else {
      return <div />
    }

  }
}

export default FormatterSubpanel;