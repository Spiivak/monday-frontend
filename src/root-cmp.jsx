import './assets/style/main.scss'
import { WorkSpacePage } from './pages/WorkSpacePage'
import { HomePage } from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { WorkSpaceBoard } from './cmps/WorkSpaceCmps/WorkSpaceBoard'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<WorkSpacePage />}>
            <Route index element={<WorkSpaceBoard />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
