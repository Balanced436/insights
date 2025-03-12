import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SourceProvider } from './contexts/SourceContext.tsx'
import { TranscriptionProvider } from './contexts/TranscriptionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SourceProvider>
      <TranscriptionProvider>
        <App />
      </TranscriptionProvider>
    </SourceProvider>
  </StrictMode>,
)
