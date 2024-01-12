import { Outlet, useNavigate } from 'react-router-dom'
import { WorkspaceHeader } from '../cmps/Workspace/header/WorkspaceHeader'
import { Sidebar } from '../cmps/Workspace/sidebar/Sidebar'
import {
  loadBoards,
  removeBoard,
  saveBoard,
  setBoardLoading,
} from '../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect } from 'react'
import { loadUsers } from '../store/actions/user.actions'
import { boardService } from '../services/board.service'
import { BatchMenu } from '../cmps/Workspace/board/groups/table/BatchMenu'

export function WorkSpacePage() {
  const navigate = useNavigate()
  useEffect(() => {
    loadAsync()
    // loadUsers()
  }, [])

  async function loadAsync(){
    await loadBoards()
  }
  //TODO add user to own the added board
  async function onAddBoard() {
    try {
      const board = await saveBoard(boardService.getEmptyBoard())
      navigate(`/workspace/${board._id}`)
    } catch (err) {
      console.error('Cannot add board', err)
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
    <section className="workspace-boards main-layout">
      <WorkspaceHeader />
      <main>
        <Sidebar {...{ onRemoveBoard, onAddBoard }} />
        <Outlet />
      </main>
    </section>
  )
}
