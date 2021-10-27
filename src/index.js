import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/styles.css'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)