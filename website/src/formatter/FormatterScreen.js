import React from 'react';
import './formatter.css'

class FormatterScreen extends React.Component {

  render() {
    return (
      <div class="">
        <div id="form-cntr" class="form-ele">
          <select id="format-type" class="form-ele" onchange="toggleCollapse($('#pivot-cntr'), this.value!='pivot')">
            <option value="table" selected>Table</option>
            <option value="pivot">Pivot</option>
          </select>
          <div id="pivot-cntr" class="form-ele collapsible collapse">Pivot Regex:<input id="pivot-regex" class="form-ele"
            type="text" value="\.\w+\(" /></div>
          <input class="form-ele" type="submit" value="Format"
            // style="z-index: 1;"
            onclick="format($('#format-type').val());" />
        </div>
        <div>
          <div class="column body-header">Format Text</div>
          <div class="column tall">
            <textarea id="input-text" name="text"></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default FormatterScreen;