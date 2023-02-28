import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Navbars from './components/Navbars'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbars/>
    <App />
  </React.StrictMode>,
)
