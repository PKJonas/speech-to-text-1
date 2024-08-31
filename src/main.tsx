import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const apiKey = import.meta.env.ASSEMBLYAI_API_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)