import { Outlet, useNavigate } from 'react-router-dom'
import { WorkspaceHeader } from '../cmps/Workspace/header/WorkspaceHeader'
import { Sidebar } from '../cmps/Workspace/sidebar/Sidebar'
import {
  loadBoards,
  removeBoard,
  saveBoard,
} from '../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect } from 'react'
import { loadUsers } from '../store/actions/user.actions'
import { boardService } from '../services/board.service'

export function WorkSpacePage() {
  useEffect(() => {
    loadBoards()
    loadUsers()
  }, [])
  const navigate = useNavigate()

  //TODO add user to own the added board
  async function onAddBoard() {
    try {
      const board = await saveBoard(boardService.getEmptyBoard())
      navigate(`/workspace/${board._id}`)
    } catch (err) {
      console.log('Cannot add board', err)
    }
  }

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg('Board removed successfully')
    } catch (err) {
      showErrorMsg('Cant remove board, try again.')
    }
  }
  return (
    <section className="workspace-index main-layout">
      <WorkspaceHeader />
      <main>
        <Sidebar {...{ onRemoveBoard, onAddBoard }} />
        <Outlet />
      </main>
    </section>
  )
}
