import _ from 'lodash'
import actionInstructionStore from '../../actionInstructionStore'
import { takeSnapshot } from '../../snapshotOperations'
import { updateChartObject } from '../../chartObjectOperations'
import Color from 'color'

// All arbitrary numbers here. Can be adjusted to see what works the best.
export function getEdgeDashes(dashStyle, edgeWidth = 1) {
  const scale = edgeWidth === 0 || edgeWidth === 1 ? 2.5 : edgeWidth

  switch (dashStyle) {
    case 'dashed':
      return [scale * 3, scale * 3]
      break
    case 'dotted':
      return [4, scale * 2]
      break
    default:
      return false
  }
}

export function getNodeHighlightStyles(nodeColorStyles = {}) {
  const highlightAdjustment = 0.3
  const nodeHighlightStyles = {}

  try {
    nodeHighlightStyles.background = nodeColorStyles.background
      ? Color(nodeColorStyles.background).lighten(highlightAdjustment).rgbString()
      : null
  } catch (e) {
    nodeHighlightStyles.background = null
  }

  try {
    nodeHighlightStyles.border = nodeColorStyles.border
      ? Color(nodeColorStyles.border).lighten(highlightAdjustment).rgbString()
      : null
  } catch (e) {
    nodeHighlightStyles.border = null
  }

  return nodeHighlightStyles
}

export function getActionInstruction(state) {
  if (state.addNodeMode) {
    return actionInstructionStore.addNode
  } else if (state.nodeCopyMode) {
    return actionInstructionStore.copySelectedNode
  } else if (state.setEdgeStartNodeMode) {
    return actionInstructionStore.setStartNodeForEdge
  } else if (state.setEdgeEndNodeMode) {
    return actionInstructionStore.setEndNodeForEdge
  } else if (state.updateMultipleNodesMode) {
    return actionInstructionStore.multipleSelectNode
  } else if (state.updateMultipleEdgesMode) {
    return actionInstructionStore.multipleSelectEdge
  } else {
    return ''
  }
}

export function updateNetworkSettings(component, settings) {
  component.networkSettings = _.merge({}, component.networkSettings, settings)
  component.network.setOptions(
    _.pick(settings, ['interaction', 'layout', 'physics'])
  )
}

// transform data of an array of arrays of key and value into an object for
// updating or creating a diagram object
export function transformFormFields(fields) {
  return fields.reduce((newFields, field) => {
    return _.set(
      newFields,
      field[0],
      !field[1] && field[1] !== false && field[1] !== 0 ? null : field[1]
    )
  }, {})
}

// merge an object into a diagram object directly to update it
export function mergeObject(type, object, editorComponent) {
  switch (type) {
    case 'edge':
      updateChartObject(editorComponent.edgeTree, object)
      break
    case 'node':
      updateChartObject(editorComponent.nodeTree, object)
      break
    case 'network':
      updateNetworkSettings(editorComponent, object)
      takeSnapshot(
        editorComponent.nodeTree.get(),
        editorComponent.edgeTree.get(),
        editorComponent.networkSettings
      )
      break
    default:
      break
  }
}
