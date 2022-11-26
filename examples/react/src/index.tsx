import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const app = document.getElementById('app')

createRoot(app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
