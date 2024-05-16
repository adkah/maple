import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import 'reactflow/dist/base.css';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)