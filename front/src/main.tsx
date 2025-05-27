import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {SourceProvider} from './contexts/SourceContext.tsx'
import {TranscriptionProvider} from './contexts/TranscriptionContext.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SourceProvider>
            <TranscriptionProvider>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </TranscriptionProvider>
        </SourceProvider>
    </StrictMode>,
)
