import './assets/style/main.scss'
import { WorkSpacePage } from './pages/WorkSpacePage'
import { HomePage } from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg'
import { DynamicModalMenu } from './cmps/Workspace/board/DynamicModalMenu'
import { TaskDetails } from './cmps/Workspace/board/groups/TaskDetails'
import { WorkSpaceBoard } from './cmps/Workspace/board/WorkspaceBoard'
import { WorkspaceIndex } from './cmps/Workspace/index/WorkspaceIndex'
import { KanbanPreview } from './cmps/Workspace/kanban/KanbanPreview'
import { FileImgModal } from './cmps/Workspace/board/groups/cells/modals/FileImgModal'
import { EditLabelsModal } from './cmps/Workspace/board/groups/cells/modals/EditLabelsModal'
import { LoginPage } from './pages/LoginPage'

export function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<LoginPage />} />
            <Route path="/workspace" element={<WorkSpacePage />}>
              <Route index element={<WorkspaceIndex />} />
              <Route path="/workspace/:boardId" element={<WorkSpaceBoard />} />
              <Route
                path="/workspace/:boardId/views"
                element={<KanbanPreview />}
              />
            </Route>
          </Routes>
          <UserMsg />
        </Router>
        <EditLabelsModal />
        <FileImgModal />
        <DynamicModalMenu />
        <TaskDetails />
      </Provider>
    </>
  )
}
