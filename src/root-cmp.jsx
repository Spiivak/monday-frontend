import './assets/style/main.scss'
import { WorkSpacePage } from './pages/WorkSpacePage'
import { HomePage } from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { WorkSpaceBoard } from './cmps/WorkSpaceCmps/WorkSpaceBoard'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg'
import { RowModal } from './cmps/WorkSpaceCmps/menus/RowModal'
import { DynamicModalMenu } from './cmps/WorkSpaceCmps/DynamicModalMenu'

export function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace" element={<WorkSpacePage />}>
              <Route index element={<WorkSpaceBoard />} />
              <Route path='/workspace/:boardId' element={<WorkSpaceBoard />} />
            </Route>
          </Routes>
          <UserMsg />
        </Router>
        <DynamicModalMenu />
      </Provider>
    </>
  )
}
