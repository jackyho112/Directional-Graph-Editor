import {
  stepToLastSnapshot,
  stepToNextSnapshot,
  freezeSnapshots,
  takeSnapshot,
} from '../../snapshotOperations'

import { defaultNetworkSettings } from './defaultEditorSettings'
import { updateNetworkSettings } from './editorGeneralHelpers'

function clearData(nodeTree, edgeTree) {
  nodeTree.clear()
  edgeTree.clear()
}

function addData(nodeTree, edgeTree, newNodes = [], newEdges = []) {
  nodeTree.add(newNodes)
  edgeTree.add(newEdges)
}

export function applySnapshot(editorComponent, snapshot, toSave) {
  freezeSnapshots(true)

  const { nodeTree, edgeTree, network } = editorComponent
  const {
    nodes = [],
    edges = [],
    network: networkSettings = {}
  } = snapshot

  clearData(nodeTree, edgeTree)

  setTimeout(() => {
    addData(nodeTree, edgeTree, nodes, edges)
    updateNetworkSettings(editorComponent, networkSettings)
    freezeSnapshots(false)
    if (toSave) takeSnapshot(nodes, edges, networkSettings)
    editorComponent.forceUpdate()
  })
}

export function applyEmptySnapshot(component) {
  applySnapshot(component, { network: defaultNetworkSettings }, true)
}

export function undo(editorComponent) {
  const snapshot = stepToLastSnapshot()

  applySnapshot(editorComponent, snapshot)
}

export function redo(editorComponent) {
  const snapshot = stepToNextSnapshot()

  applySnapshot(editorComponent, snapshot)
}
