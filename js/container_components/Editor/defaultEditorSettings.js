export const defaultNetworkSettings = {
  comment: '',
  physics: { enabled: false },
  interaction: {
    multiselect: true,
    selectConnectedEdges: false,
    navigationButtons: true,
  },
  layout: {
    improvedLayout: true,

    hierarchical: {
      enabled: false,
      nodeSpacing: 100,
      treeSpacing: 150,
      levelSeparation: 150,
      blockShifting: false,
    },
  },
}

export const defaultNodeSettings = {
  dashStyle: 'straight',
  shape: 'ellipse',
  label: 'node',
  width: 1,
  color: {
    background: '#87AEE2',
    border: '#3985EB',
    highlight: {
      background: '#DEE9F7',
      border: '#86B5F3',
    }
  },
  font: {
    color: '#000000',
    size: '12',
    align: 'center',
  },
  shapeProperties: {
    borderDashes: ['',''],
  },
  fixed: {
    x: true,
    y: true,
  },
  widthConstraint: {},
  heightConstraint: { valign: 'middle' },
  metadata: {},
}

export const defaultEdgeSettings = {
  dashStyle: 'straight',
  arrows: 'to',
  label: 'edge',
  color: '#97C2FC',
  width: 1,
  arrowStrikethrough: false,
  font: {
    color: '#000000',
    size: '12',
    align: 'middle',
  },
  metadata: {},
}

export const defaultEditorState = {
  height: '90%',
  addNodeMode: false,
  setEdgeStartNodeMode: false,
  setEdgeEndNodeMode: false,
  nodeCopyMode: false,
  updateMultipleNodesMode: false,
  updateMultipleEdgesMode: false,
  nodeFormFields: defaultNodeSettings,
  edgeFormFields: defaultEdgeSettings,
  currentEditingObject: {},
  currentEditingObjectType: '',
}
