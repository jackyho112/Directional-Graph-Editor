import _ from 'lodash'
import { takeSnapshot, freezeSnapshots } from '../../snapshotOperations'

function updateNodePosition(editorComponent, event) {
  if (event.nodes.length === 0) return

  editorComponent.nodeTree.update(_.merge(
    _.find(editorComponent.nodeTree.get(), { id: event.nodes[0] }),
    { ...event.pointer.canvas }
  ))
}

function memorizeCurrentLayout(editorComponent) {
  if (!editorComponent.networkSettings.layout.hierarchical.direction) {
    editorComponent.updateNetwork([[
      'layout.randomSeed',
      editorComponent.network.getSeed()
    ]])
  }
}

// attach events that will take a new snapshot
function attachSnapshotEvents(editorComponent) {
  editorComponent.nodeTree.on('*', () => {
    takeSnapshot(
      editorComponent.nodeTree.get(),
      editorComponent.edgeTree.get(),
      editorComponent.networkSettings
    )
  })

  editorComponent.edgeTree.on('*', () => {
    takeSnapshot(
      editorComponent.nodeTree.get(),
      editorComponent.edgeTree.get(),
      editorComponent.networkSettings
    )
  })
}

function selectObject(editorComponent, event) {
  if (event.nodes.length === 1) {
    const currentlySelectedNode = _.find(editorComponent.nodeTree.get(), { id: event.nodes[0] })
    editorComponent.setState({nodeFormFields: currentlySelectedNode})
  } else if (event.edges.length === 1) {
    const currentlySelectedEdge = _.find(editorComponent.edgeTree.get(), { id: event.edges[0] })
    editorComponent.setState({edgeFormFields: currentlySelectedEdge})
  }
}

function unselectObject(editorComponent, event) {
  if (event.nodes.length === 0) {
    const { nodeFormFields } = editorComponent.state
    editorComponent.setState({ nodeFormFields: _.omit(nodeFormFields, 'id') })
  }

  if (event.edges.length === 0) {
    const { edgeFormFields } = editorComponent.state
    editorComponent.setState({ edgeFormFields: _.omit(edgeFormFields, 'id') })
  }
}

function attachDragEvents(editorComponent) {
  editorComponent.network.on("dragStart", (event) => {
    freezeSnapshots(true)
  })

  editorComponent.network.on("dragging", (event) => {
    updateNodePosition(editorComponent, event)
  })

  editorComponent.network.on("dragEnd", (event) => {
    updateNodePosition(editorComponent, event)
    memorizeCurrentLayout(editorComponent)
    selectObject(editorComponent, event)

    setTimeout(() => {
      freezeSnapshots(false)
      takeSnapshot(
        editorComponent.nodeTree.get(),
        editorComponent.edgeTree.get(),
        editorComponent.networkSettings
      )
    })
  })
}

// attach handling of the user clicking on the network
function attachDiagramClickEvents(editorComponent) {
  const { state } = editorComponent
  let intermediateData = {}

  editorComponent.network.on("click", (event) => {
    if (state.addNodeMode) {
      const coordinates = event.pointer.canvas

      editorComponent.addObject('node', coordinates)
      editorComponent.setState({ addNodeMode: false })
    } else if (state.setEdgeStartNodeMode) {
      if (event.nodes.length === 0) return
      intermediateData = _.assign(intermediateData, { from: event.nodes[0] })
      editorComponent.setState({ setEdgeEndNodeMode: true, setEdgeStartNodeMode: false })
    } else if (state.setEdgeEndNodeMode) {
      if (event.nodes.length === 0) return
      intermediateData = _.assign(intermediateData, { to: event.nodes[0] })
      editorComponent.addObject('edge', intermediateData)
      editorComponent.setState({ setEdgeEndNodeMode: false }, () => intermediateData = {})
    }

    selectObject(editorComponent, event)
    unselectObject(editorComponent, event)
  })
}

export function attachEditorEvents(editorComponent) {
  attachSnapshotEvents(editorComponent)

  attachDragEvents(editorComponent)

  attachDiagramClickEvents(editorComponent)
}
