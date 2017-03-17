import React from 'react'
import { saveCurrentSnapshot } from '../../fileManagerOperations'

const { func, object } = React.PropTypes

const NetworkForm = ({
  onUndo,
  onRedo,
  updateNetworkOptions,
  network: { layout: { hierarchical } },
  onUploadSnapshot,
  onCreateNewDiagram,
  enterObjectEditMode,
}) => (
  <td>
    <h2>Editor</h2>
    <table>
      <tr>
        <td />
        <td><label>Layout</label></td>
        <td>
          <select
            onChange={(event) => {
              const { value } = event.target
              if (value === '') {
                updateNetworkOptions(['layout.hierarchical.enabled', false])
                updateNetworkOptions(['physics.enabled', false])
              } else {
                updateNetworkOptions(
                    ['layout.hierarchical.enabled', true],
                    ['layout.hierarchical.direction', value],
                  )
              }
            }}
            value={hierarchical.enabled ? hierarchical.direction : ''}
          >
            <option value="">None</option>
            <option value="UD">Up-down</option>
            <option value="DU">Down-up</option>
            <option value="LR">Left-right</option>
            <option value="RL">Right-left</option>
          </select>
        </td>
      </tr>
      <tr>
        <td />
        <td><label>Layout node spacing</label></td>
        <td>
          <input
            type="number"
            onChange={(event) => {
              updateNetworkOptions([
                'layout.hierarchical.nodeSpacing', parseInt(event.target.value) || 0,
              ])
            }}
            value={hierarchical.nodeSpacing}
          />
        </td>
      </tr>
      <tr>
        <td />
        <td><label>Layout tree spacing</label></td>
        <td>
          <input
            type="number"
            onChange={(event) => {
              updateNetworkOptions([
                'layout.hierarchical.treeSpacing', parseInt(event.target.value) || 0,
              ])
            }}
            value={hierarchical.treeSpacing}
          />
        </td>
      </tr>
      <tr>
        <td />
        <td><label>Layout level spacing</label></td>
        <td>
          <input
            type="number"
            onChange={(event) => {
              updateNetworkOptions([
                'layout.hierarchical.levelSeparation', parseInt(event.target.value) || 0,
              ])
            }}
            value={hierarchical.levelSeparation}
          />
        </td>
      </tr>
      <tr>
        <td />
        <td>Action</td>
        <td>
          <button onClick={() => onUndo()}>
              Undo
            </button>

          <button onClick={() => onRedo()}>
              Redo
            </button>

          <br />

          <button onClick={() => saveCurrentSnapshot()}>
              Save
            </button>

          <input id="filter-upload-input" type="file" className="hidden" />

          <button onClick={() => onUploadSnapshot('filter-upload-input')}>
              Upload
            </button>

          <br />

          <button onClick={() => onCreateNewDiagram()}>
              Create new diagram
            </button>

          <br />

          <button onClick={() => enterObjectEditMode()}>
              Edit comment and settings
            </button>
        </td>
      </tr>
    </table>
  </td>
  )

NetworkForm.propTypes = {
  onUndo: func,
  onRedo: func,
  updateNetworkOptions: func,
  network: object,
  onUploadSnapshot: func,
  onCreateNewDiagram: func,
  enterObjectEditMode: func,
}

export default NetworkForm
