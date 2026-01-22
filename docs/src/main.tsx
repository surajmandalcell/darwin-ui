import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AnimationSpeedProvider } from './contexts/animation-speed-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimationSpeedProvider>
        <App />
      </AnimationSpeedProvider>
    </BrowserRouter>
  </StrictMode>,
)
