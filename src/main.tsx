import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeContextProvider } from '@contexts/theme.context.tsx'
import { AuthContextProvider } from '@contexts/auth.context.tsx'

import App from './App.tsx'

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('../src/_mocks/bowser.ts')
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
