import './App.css'
import { BrowserRouter, Link,Routes, Route, RouterProvider } from 'react-router-dom'
import Main from './pages/main/Main'
import router from './router/index'

function App() {

  return (
    <div>
    <RouterProvider router={router}>
    </RouterProvider>
    </div>
  )
}

export default App
