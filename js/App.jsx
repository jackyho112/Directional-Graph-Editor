import React from 'react'
import { Route } from 'react-router-dom'
import Editor from './container_components/Editor/Editor'
import './global.scss'

const App = () => (
  <div className="app">
    <Route
      exact
      path=""
      component={props => <Editor {...props} />}
    />
  </div>
)

export default App
