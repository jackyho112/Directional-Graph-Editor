import React from 'react'
import _ from 'lodash'
import './NodeShapeSelect.scss'

const { string, func } = React.PropTypes

const getShapeOptionClass = (currentShape, shape) => {
  if (currentShape === shape) {
    return `shape selected ${shape}`
  } else if (_.isEmpty(currentShape) && shape === 'ellipse') {
    return `shape selected ${shape}`
  }
  return `shape ${shape}`
}

const ShapeSelect = ({ currentShape, onSelectShape }) => (
  <tr>
    <td />
    <td><label htmlFor="node-label">Shape</label></td>
    <td className="node-shape-container">
      {
        ['ellipse', 'box', 'diamond', 'triangle', 'star', 'database', 'circle'].map(
          (shape) => (
            <button
              className={getShapeOptionClass(currentShape, shape)}
              onClick={() => onSelectShape(shape)}
            />
          )
        )
      }
    </td>
  </tr>
)

ShapeSelect.propTypes = {
  currentShape: string,
  onSelectShape: func,
}

export default ShapeSelect
