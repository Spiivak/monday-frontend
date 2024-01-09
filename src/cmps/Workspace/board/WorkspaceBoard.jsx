import { BoardGroupList } from './groups/BoardGroupList'

import { BoardHeader } from './header/BoardHeader'
import { useEffect, useState } from 'react'
import { addGroup, saveBoard } from '../../../store/actions/board.actions'
import { useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router'
import { MondayLoader } from '../MondayLoader'
export function WorkSpaceBoard() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const navigate = useNavigate()
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const users = useSelector((storeState) => storeState.userModule.users)
  const boardLoading = useSelector(
    (storeState) => storeState.boardModule.boardLoading
  )
  const { boardId } = useParams()

  // useEffect(() => {
  // loadBoards()
  // loadUsers()
  // }, [])

  useEffect(() => {
    if (boardId) {
      setSelectedBoard(boards.find((board) => board._id === boardId))
    } else {
      setSelectedBoard(boards[0])
    }
  }, [boardId, boards])

  async function onUpdateBoard(boardId) {
    try {
      await saveBoard(boardId)
    } catch (err) {
      console.log('Cannot add board', err)
    }
  }

  //TODO add user to own the added group
  function onAddGroup(boardId) {
    addGroup(boardId)
  }

  return (
    <>
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
      {boardLoading && <MondayLoader />}
    </>
  )
}
