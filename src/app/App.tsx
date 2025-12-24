import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { router } from './routes'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App

