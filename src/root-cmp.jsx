import { useState } from 'react'
import { Provider } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/style/main.scss'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Provider>
      <Home/>
    // </Provider>
  )
}

export default App
