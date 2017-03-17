import React from 'react'
import { getColorInputType } from '../formHelpers'

const { bool, func, object } = React.PropTypes

const EdgeForm = ({
  addEdgeMode,
  updateMultipleEdgesMode,
  onToggleAddEdgeMode,
  onToggleMutipleUpdateMode,
  onRemoveEdge,
  onUpdateEdgeField,
  edge,
  enterObjectEditMode,
}) => (
  <td>
    <h2>Edge</h2>
    <table>
      <tr>
        <td />
        <td><label>Label</label></td>
        <td>
          <input
            type="text"
            onChange={event => onUpdateEdgeField(['label', event.target.value])}
            value={edge.label}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Comment</label></td>
        <td>
          <input
            type="text"
            onChange={event => onUpdateEdgeField(['title', event.target.value])}
            value={edge.title}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Color</label></td>
        <td>
          <input
            type={getColorInputType()}
            onChange={event => onUpdateEdgeField(['color', event.target.value])}
            value={edge.color}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Width</label></td>
        <td>
          <input
            type="number"
            onChange={event => onUpdateEdgeField(['width', parseInt(event.target.value)])}
            value={edge.width}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Font color</label></td>
        <td>
          <input
            type={getColorInputType()}
            onChange={event => onUpdateEdgeField(['font.color', event.target.value])}
            value={edge.font.color}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Font size</label></td>
        <td>
          <input
            type="number"
            onChange={event => onUpdateEdgeField(['font.size', String(event.target.value)])}
            value={edge.font.size}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Style</label></td>
        <td>
          <select
            onChange={event => onUpdateEdgeField(['dashStyle', event.target.value])}
            value={edge.dashStyle}
          >
            <option value="straight">Straight</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Label Alignment</label></td>
        <td>
          <select
            onChange={event => onUpdateEdgeField(['font.align', event.target.value])}
            value={edge.font.align}
          >
            <option value="middle">Middle</option>
            <option value="top">Top</option>
            <option value="horizontal">Horizontal</option>
            <option value="bottom">Bottom</option>
          </select>
        </td>
      </tr>

      <tr>
        <td />
        <td>Action</td>
        <td>
          <button
            onClick={() => onToggleAddEdgeMode()}
            className={addEdgeMode ? 'toggled' : ''}
          >
              Toggle add
            </button>

          <button
            onClick={() => onUpdateEdgeField(['arrows', edge.arrows === 'to' ? 'from' : 'to'])}
          >
              Change direction on selected
            </button>

          <br />

          <button
            onClick={() => onToggleMutipleUpdateMode('edge')}
            className={updateMultipleEdgesMode ? 'toggled' : ''}
          >
              Toggle multiple update
            </button>

          <button onClick={() => onRemoveEdge()}>
              Remove selected
            </button>

          <br />

          <button onClick={() => enterObjectEditMode()}>
              Edit selected properties and metadata
            </button>
        </td>
      </tr>
    </table>
  </td>
  )

EdgeForm.propTypes = {
  addEdgeMode: bool,
  updateMultipleEdgesMode: bool,
  onToggleAddEdgeMode: func,
  onToggleMutipleUpdateMode: func,
  onRemoveEdge: func,
  onUpdateEdgeField: func,
  edge: object,
  enterObjectEditMode: func,
}

export default EdgeForm
