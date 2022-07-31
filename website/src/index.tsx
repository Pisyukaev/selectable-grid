import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.querySelector('#root')!
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
