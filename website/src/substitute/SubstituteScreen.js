import React from 'react';
import './substitute.css'

class SubstituteScreen extends React.Component {

  render() {
    return (
      <div id="substitute-screen-root">
        <div class="stretch-rows">
          <div class="column body-header">Input</div>
          <div class="column body-header">Output</div>
        </div>
        <div class="stretch-rows">
          <div class="column tall">
            <textarea id="input-text" name="text"></textarea>
          </div>
          <div class="column tall">
            <textarea id="output-text" readonly></textarea>
          </div>
        </div>
        <div id="submit-cntr" class="form-ele">
          <span class="form-ele">Find: <input id="find" type="text" name="find" /></span>
          <span class="form-ele">Replace: <input id="replace" type="text" name="replace" /></span>
          <input class="form-ele" type="submit" value="Substitute" onclick="substitute();" />
        </div>

        <div id="case-convert-cntr">
          <div id="case-convert-hdr">Convert Case</div>
          <div class="centre-content-cols">
            <span class="case-ele">Input: <input id="case-in" class="case-input" type="text" oninput="changeCase()" /></span>
            <span class="case-ele">Output Type:
          <select id="case-out-type" onchange="changeCase()">
                <option value="pascal">PascalCase</option>
                <option value="camel">camelCase</option>
                <option value="const">CONST_CASE</option>
              </select>
            </span>
            <span class="centre-content-rows">Output: <input id="case-out" class="case-input" readonly /></span>
          </div>
        </div>
      </div>
    );
  }
}

export default SubstituteScreen;