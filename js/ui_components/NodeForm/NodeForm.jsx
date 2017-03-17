import React from 'react'
import NodeShapeSelect from '../NodeShapeSelect/NodeShapeSelect'
import { getColorInputType } from '../formHelpers'

const { object, func, bool } = React.PropTypes

const NodeForm = ({
  addNodeMode,
  nodeCopyMode,
  updateMultipleNodesMode,
  onToggleAddNodeMode,
  onToggleNodeCopyMode,
  onToggleMutipleUpdateMode,
  onRemoveNode,
  onUpdateNodeField,
  node,
  enterObjectEditMode,
}) => (
  <td>
    <h2>Node</h2>
    <table>
      <tr>
        <td />
        <td><label htmlFor="node-label">Label</label></td>
        <td>
          <input
            type="text"
            onChange={event => onUpdateNodeField(['label', event.target.value])}
            value={node.label}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label htmlFor="node-label">Comment</label></td>
        <td>
          <input
            type="text"
            onChange={event => onUpdateNodeField(['title', event.target.value])}
            value={node.title}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Min. size</label></td>
        <td>
          <input
            type="number"
            onChange={(event) => {
              onUpdateNodeField(
                  ['heightConstraint.minimum', parseInt(event.target.value)],
                  ['size', parseInt(event.target.value)],
                  ['widthConstraint.minimum', parseInt(event.target.value)],
                )
            }}
            value={node.heightConstraint.minimum}
          />
        </td>
      </tr>

      <NodeShapeSelect
        currentShape={node.shape}
        onSelectShape={shape => onUpdateNodeField(['shape', shape])}
      />

      <tr>
        <td />
        <td><label>Background color</label></td>
        <td>
          <input
            type={getColorInputType()}
            onChange={event => onUpdateNodeField(['color.background', event.target.value])}
            value={node.color.background}
          />
        </td>
        <td />
      </tr>

      <tr>
        <td />
        <td><label>Font color</label></td>
        <td>
          <input
            type={getColorInputType()}
            onChange={event => onUpdateNodeField(['font.color', event.target.value])}
            value={node.font.color}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Font size</label></td>
        <td>
          <input
            type="number"
            onChange={event => onUpdateNodeField(['font.size', String(event.target.value)])}
            value={node.font.size}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Border color(any format)</label></td>
        <td>
          <input
            type={getColorInputType()}
            onChange={event => onUpdateNodeField(['color.border', event.target.value])}
            value={node.color.border}
          />
        </td>
      </tr>

      <tr>
        <td />
        <td><label>Border style</label></td>
        <td>
          <select
            onChange={(event) => {
              onUpdateNodeField(
                  ['shapeProperties.borderDashes', event.target.value.split(',')],
                )
            }}
            value={node.shapeProperties.borderDashes.join(',')}
          >
            <option value=",">Straight</option>
            <option value="10,5">Dashed</option>
            <option value="2,2">Dotted</option>
          </select>
        </td>
      </tr>

      <tr>
        <td />
        <td>Action</td>
        <td>
          <button
            onClick={() => onToggleAddNodeMode()}
            className={addNodeMode ? 'toggled' : ''}
          >
              Toggle add
            </button>

          <button
            onClick={() => onToggleNodeCopyMode()}
            className={nodeCopyMode ? 'toggled' : ''}
          >
              Toggle selected copy
            </button>

          <br />

          <button
            onClick={() => onToggleMutipleUpdateMode('node')}
            className={updateMultipleNodesMode ? 'toggled' : ''}
          >
              Toggle multiple update
            </button>

          <button onClick={() => onRemoveNode()}>
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

NodeForm.propTypes = {
  addNodeMode: bool,
  nodeCopyMode: bool,
  updateMultipleNodesMode: bool,
  onToggleAddNodeMode: func,
  onToggleNodeCopyMode: func,
  onToggleMutipleUpdateMode: func,
  onRemoveNode: func,
  onUpdateNodeField: func,
  node: object,
  enterObjectEditMode: func,
}

export default NodeForm
