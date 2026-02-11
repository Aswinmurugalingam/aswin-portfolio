import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

// Safe global smooth scroll (does NOT block scrolling)
;(function applySmoothScrollOnly() {
  if (typeof document === 'undefined') return
  // Smooth anchor/keyboard scroll
  document.documentElement.style.scrollBehavior = 'smooth'
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
