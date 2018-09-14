import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as reactRouterDom from 'react-router-dom'

ReactDOM.render(
  <reactRouterDom.BrowserRouter>
    <App />
  </reactRouterDom.BrowserRouter>,
  document.getElementById('root')
)
