/* global
  document
**/

import React, { Component } from 'react'
import JSONEditor from 'jsoneditor'
import _ from 'lodash'
import 'jsoneditor/dist/jsoneditor.min.css'
import './ObjectEditorModal.scss'

const { object, func } = React.PropTypes

class ObjectEditorModal extends Component {
  componentDidMount() {
    const container = document.getElementById('jsoneditor')
    const editor = new JSONEditor(container, {})
    editor.set(this.props.object || {})
    this.editor = editor
  }

  componentWillReceiveProps(nextProps) {
    this.editor.set(nextProps.object || {})
  }

  render() {
    return (
      <div className={`json-editor-overlay ${_.isEmpty(this.props.object) ? 'hidden' : ''}`}>
        <div className="json-editor-container">
          <p>
            <button onClick={() => this.props.onUpdateObject(this.editor.get())}>
              Update and close editor
            </button>
          </p>
          <div id="jsoneditor" />
        </div>
      </div>
    )
  }
}

ObjectEditorModal.propTypes = {
  object,
  onUpdateObject: func,
}

export default ObjectEditorModal
