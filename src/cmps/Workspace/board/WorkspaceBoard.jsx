import { BoardGroupList } from './groups/BoardGroupList'

import { BoardHeader } from './header/BoardHeader'
import { useEffect, useState } from 'react'
import {
  // addBoard,
  addGroup,
  loadBoards,
  removeBoard,
  saveBoard,
} from '../../../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'
import { useParams } from 'react-router'
import { loadUsers } from '../../../store/actions/user.actions'
import { boardService } from '../../../services/board.service'
import { Sidebar } from '../sidebar/Sidebar'
import { MondayLoader } from '../MondayLoader'
export function WorkSpaceBoard() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const users = useSelector((storeState) => storeState.userModule.users)
  const { boardId } = useParams()
  const isLoading = useSelector((storeState) => storeState.boardModule.isLoading)
  
  useEffect(() => {
    loadBoards()
    loadUsers()
  }, [])

  useEffect(() => {
    if (boardId) {
      setSelectedBoard(boards.find((board) => board._id === boardId))
    } else {
      setSelectedBoard(boards[0])
    }
  }, [boardId, boards])

  //TODO add user to own the added board
  async function onAddBoard() {
    const board = boardService.getEmptyBoard()
    try {
      await saveBoard(board)
    } catch (err) {
      console.log('Cannot add board', err)
    }
  }
  async function onUpdateBoard(boardId) {
    try {
      await saveBoard(boardId)
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

  //TODO add user to own the added group
  function onAddGroup(boardId) {
    addGroup(boardId)
  }

  return (
    <main >
      {isLoading ? <MondayLoader /> : 
      <>
      <Sidebar {...{ onRemoveBoard, onAddBoard }} />
      <section className="work-space-board">
        <div className="workspace-board-header">
          <BoardHeader board={selectedBoard} {...{ onUpdateBoard }} />
        </div>
        <div className="table-section">
          {!!boards && (
            <BoardGroupList board={selectedBoard} onAddGroup={onAddGroup} />
            )}
        </div>
      </section>
      </>
          }
    </main>
  )
}
