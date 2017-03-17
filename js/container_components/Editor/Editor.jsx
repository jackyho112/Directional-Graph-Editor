/* global
  document
**/

import React, { Component } from 'react'
import _ from 'lodash'
import vis from 'vis'
import 'vis/dist/vis-network.min.css'
import NodeForm from '../../ui_components/NodeForm/NodeForm'
import EdgeForm from '../../ui_components/EdgeForm/EdgeForm'
import NetworkForm from '../../ui_components/NetworkForm/NetworkForm'
import Diagram from '../../ui_components/Diagram/Diagram'
import ObjectEditorModal from '../../ui_components/ObjectEditorModal/ObjectEditorModal'
import { saveCurrentSnapshot, loadSnapshotFromFile } from '../../fileManagerOperations'
import { takeSnapshot, freezeSnapshots } from '../../snapshotOperations'
import { undo, redo, applySnapshot, applyEmptySnapshot } from './editorTimeMachineOperations'
import { attachEditorEvents } from './editorEventHelpers'
import {
  addChartObject,
  updateChartObject,
  removeChartObject,
} from '../../chartObjectOperations'
import {
  getEdgeDashes,
  getNodeHighlightStyles,
  getActionInstruction,
  updateNetworkSettings,
  transformFormFields,
  mergeObject,
} from './editorGeneralHelpers'
import {
  defaultNetworkSettings,
  defaultNodeSettings,
  defaultEdgeSettings,
  defaultEditorState,
} from './defaultEditorSettings'
import './Editor.scss'

const diagramId = 'network'

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = defaultEditorState
    this.networkSettings = defaultNetworkSettings
    this.edgeTree = new vis.DataSet()
    this.nodeTree = new vis.DataSet()
    this.defaultNodeSettings = defaultNodeSettings
    this.defaultEdgeSettings = defaultEdgeSettings
  }

  initializeDiagram() {
    const container = document.getElementById(diagramId)
    const data = { edges: this.edgeTree, nodes: this.nodeTree }
    this.network = new vis.Network(container, data, _.omit(this.networkSettings, 'comment'))
    attachEditorEvents(this)
    takeSnapshot(this.nodeTree.get(), this.edgeTree.get(), this.networkSettings)
  }

  addObject(type, options = {}) {
    addChartObject(type, this[`${type}Tree`], this.state[`${type}FormFields`], options)
  }

  updateObject(type) {
    let objects

    if (this.state[`updateMultiple${_.capitalize(type)}sMode`]) {
      objects = _.values(this.network.selectionHandler.selectionObj[`${type}s`])
    }

    updateChartObject(this[`${type}Tree`], this.state[`${type}FormFields`], objects)
  }

  removeObject(type) {
    const objectFormFieldsKey = `${type}FormFields`
    const objectFormFields = this.state[objectFormFieldsKey]

    if (objectFormFields.id) {
      this.setState({ [objectFormFields]: _.omit(objectFormFields, 'id') })
      removeChartObject(this[`${type}Tree`], objectFormFields.id)
    }
  }

  updateNetwork(fields) {
    const options = transformFormFields(fields)

    updateNetworkSettings(this, options)
    takeSnapshot(this.nodeTree.get(), this.edgeTree.get(), this.networkSettings)
  }

  // update the stored fields in the state of the component based on object type
  updateObjectFields(type, fields) {
    const objectFormFieldsKey = `${type}FormFields`
    const newObjectFields = _.merge(
      {},
      this[`default${_.capitalize(type)}Settings`],
      this.state[objectFormFieldsKey],
      transformFormFields(fields),
    )

    if (type === 'node') {
      newObjectFields.color.highlight = getNodeHighlightStyles(newObjectFields.color)
    } else if (type === 'edge') {
      const { dashStyle, width } = newObjectFields
      newObjectFields.dashes = getEdgeDashes(dashStyle, width)
    }

    this.setState({ [objectFormFieldsKey]: newObjectFields }, () => {
      this.updateObject(type)
    })
  }

  toggleAddEdgeMode() {
    const { setEdgeStartNodeMode, setEdgeEndNodeMode } = this.state

    if (setEdgeStartNodeMode || setEdgeEndNodeMode) {
      this.setState({ setEdgeStartNodeMode: false, setEdgeEndNodeMode: false })
    } else {
      this.setState({ setEdgeStartNodeMode: true, setEdgeEndNodeMode: false })
    }
  }

  toggleMutipleUpdateMode(type) {
    const key = `updateMultiple${_.capitalize(type)}sMode`

    this.setState({ [key]: !this.state[key] })
  }

  clearDiagram() {
    saveCurrentSnapshot()
    applyEmptySnapshot(this)
  }

  uploadSnapshot(fileInputId) {
    freezeSnapshots(true)

    loadSnapshotFromFile((snapshot) => {
      applySnapshot(this, snapshot, true)
      freezeSnapshots(false)
    }, fileInputId)
  }

  enterObjectEditMode(type) {
    const currentEditingObject = _.merge(
      {},
      type === 'network' ? this.networkSettings : this.state[`${type}FormFields`]
    )

    if (type !== 'network' && !currentEditingObject.id) return

    this.setState({ currentEditingObjectType: type, currentEditingObject })
  }

  // directly merge an object to an existing object of a diagram for bulk modification
  mergeObjectDirect(object) {
    mergeObject(this.state.currentEditingObjectType, object, this)
    this.setState({ currentEditingObject: {}, currentEditingObjectType: '' })
  }

  render() {
    return (
      <div className="editor-container">
        <div className="form-container">
          <table className="form-table">
            <tr className="form-container">
              <NetworkForm
                updateNetworkOptions={(...fields) => this.updateNetwork(fields)}
                onRedo={() => redo(this)}
                onUndo={() => undo(this)}
                onCreateNewDiagram={() => this.clearDiagram()}
                network={this.networkSettings}
                onUploadSnapshot={fileInputId => this.uploadSnapshot(fileInputId)}
                enterObjectEditMode={() => this.enterObjectEditMode('network')}
              />

              <hr className="divider" />

              <NodeForm
                node={this.state.nodeFormFields}
                addNodeMode={this.state.addNodeMode}
                nodeCopyMode={this.state.nodeCopyMode}
                onToggleAddNodeMode={
                  () => this.setState({ addNodeMode: !this.state.addNodeMode })
                }
                onUpdateNode={() => this.updateObject('node')}
                onRemoveNode={() => this.removeObject('node')}
                onUpdateNodeField={(...fields) => {
                  this.updateObjectFields('node', fields)
                }}
                onToggleNodeCopyMode={
                  () => this.setState({ nodeCopyMode: !this.state.nodeCopyMode })
                }
                instruction={getActionInstruction(this.state)}
                updateMultipleNodesMode={this.state.updateMultipleNodesMode}
                onToggleMutipleUpdateMode={type => this.toggleMutipleUpdateMode(type)}
                enterObjectEditMode={() => this.enterObjectEditMode('node')}
              />

              <hr className="divider" />

              <EdgeForm
                edge={this.state.edgeFormFields}
                addEdgeMode={this.state.setEdgeStartNodeMode || this.state.setEdgeEndNodeMode}
                onToggleAddEdgeMode={() => this.toggleAddEdgeMode()}
                onUpdateEdge={() => this.updateObject('edge')}
                onRemoveEdge={() => this.removeObject('edge')}
                onUpdateEdgeField={(...fields) => {
                  this.updateObjectFields('edge', fields)
                }}
                instruction={getActionInstruction(this.state)}
                updateMultipleEdgesMode={this.state.updateMultipleEdgesMode}
                onToggleMutipleUpdateMode={type => this.toggleMutipleUpdateMode(type)}
                enterObjectEditMode={() => this.enterObjectEditMode('edge')}
              />
            </tr>
          </table>
        </div>

        <Diagram
          diagramId={diagramId}
          instruction={getActionInstruction(this.state)}
          comment={this.networkSettings.comment}
          initializeDiagram={() => this.initializeDiagram()}
        />

        <ObjectEditorModal
          object={this.state.currentEditingObject}
          onUpdateObject={object => this.mergeObjectDirect(object)}
        />
      </div>
    )
  }
}

export default Editor
