import _ from 'lodash'

export function addChartObject(type, tree, ...fields) {
  tree.add(_.assign(
    {},
    ...fields,
    { id: `${Date.now()}-${Math.round(Math.random() * 100)}` }
  ))
}

export function updateChartObject(tree, fields, objects) {
  // updating multiple objects at once
  // need to omit some object-unique fields, including 'id', 'x', 'y', 'to' & 'from',
  // from the universal data/fields for updating each object
  if (objects) {
    const multipleUpdateFields = objects.map(object => {
      return _.assign(
        {},
        _.omit(fields, ['x', 'y', 'id', 'to', 'from']),
        {
          x: object.x,
          y: object.y,
          id: object.id,
          to: object.to ? object.to.id : '',
          from: object.from ? object.from.id : '',
        }
      )
    })

    tree.update(multipleUpdateFields)
  } else if (fields.id) {
    tree.update(fields)
  } else {
    return
  }
}

export function removeChartObject(tree, id) {
  tree.remove({ id })
}
