import React, { Component } from 'react';

class GeneratorList extends Component {

  constructor(props) {
    super(props)

    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  handleListItemClick(e, id) {
    this.props.onItemClick(e, id)
  }

  render() {
    return (
      <div className="generator-list-root">
        {
          this.props.templates.map((x, id) => {
            return (
              <div className="generator-list-item" key={id}
                onClick={e => this.props.onItemClick(e, id)}
                style={{ display: x.toLowerCase().includes(this.props.search.toLowerCase()) ? "" : "none" }}>
                {x}
              </div>
            )
          })
        }
      </div >
    );
  }
}

export default GeneratorList;
