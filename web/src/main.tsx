import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from "react-ga4";
import './index.css'
import App from './App.tsx'

// Initialize Google Analytics
// Hardcoded fallback to ensure it works in production Docker build
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-S22QMLNYRJ";
if (measurementId) {
  ReactGA.initialize(measurementId);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
