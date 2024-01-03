import { useState } from 'react'
import { Provider } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/style/main.scss'
import { HomePage } from './pages/HomePage'
import { Route, Router, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Provider>
      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />
        </Routes>
      </Router>
    // </Provider>
  )
}

export default App
