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
      <button
        className={getShapeOptionClass(currentShape, 'ellipse')}
        onClick={() => onSelectShape('ellipse')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'box')}
        onClick={() => onSelectShape('box')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'diamond')}
        onClick={() => onSelectShape('diamond')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'triangle')}
        onClick={() => onSelectShape('triangle')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'star')}
        onClick={() => onSelectShape('star')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'database')}
        onClick={() => onSelectShape('database')}
      />
      <button
        className={getShapeOptionClass(currentShape, 'circle')}
        onClick={() => onSelectShape('circle')}
      />
    </td>
  </tr>
)

ShapeSelect.propTypes = {
  currentShape: string,
  onSelectShape: func,
}

export default ShapeSelect
