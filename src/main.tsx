import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './hooks/useStore'

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StoreProvider>
)
