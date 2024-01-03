import './assets/style/main.scss'
import { BoardPage } from './pages/BoardPage'
import { HomePage } from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

export function App() {


  return (
    <>
      <h1>Hello</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={<BoardPage />} />
        </Routes>
      </Router>
    </>
  )
}


