import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/App/App.jsx";
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
