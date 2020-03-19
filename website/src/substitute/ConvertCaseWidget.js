import React, { Component } from 'react';

class ConvertCaseWidget extends Component {


  render() {
    return (
      <div id="case-convert-cntr" >
        <div id="case-convert-hdr">Convert Case</div>
        <div class="centre-content-cols">
          <span class="case-ele">Input: <input id="case-in" class="case-input" type="text" oninput="changeCase()" /></span>
          <span class="case-ele">Output Type:
            <select id="case-out-type">
              <option value="pascal">PascalCase</option>
              <option value="camel">camelCase</option>
              <option value="const">CONST_CASE</option>
            </select>
          </span>
          <span class="centre-content-rows">Output: <input id="case-out" class="case-input" readonly /></span>
        </div>
      </div >
    );
  }
}

export default ConvertCaseWidget;