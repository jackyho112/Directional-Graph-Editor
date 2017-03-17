import React, { Component } from 'react'
import './Diagram.scss'

const { func, string } = React.PropTypes

class Diagram extends Component {
  componentDidMount() {
    this.props.initializeDiagram()
  }

  render() {
    return (
      <table className="diagram-section">
        <tr>
          <td className="diagram-container">
            <h4>{`Network - ${this.props.instruction}`}</h4>
            <p>{`Comment: ${this.props.comment}`}</p>
            <div id={this.props.diagramId} className="diagram" />
          </td>
        </tr>
      </table>
    )
  }
}

Diagram.propTypes = {
  initializeDiagram: func,
  instruction: string,
  comment: string,
  diagramId: string,
}

export default Diagram
