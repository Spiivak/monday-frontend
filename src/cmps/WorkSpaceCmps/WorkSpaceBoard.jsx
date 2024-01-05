import { BoardViewList } from '../WorkSpaceBoardCmps/BoardViewList'
import { BoardFilter } from '../WorkSpaceBoardCmps/BoardFilter'
import { BoardTabs } from '../WorkSpaceBoardCmps/BoardTabs'

import { BoardHeader } from '../WorkSpaceBoardCmps/BoardHeader'
import { useEffect, useState } from 'react'
import {
  addBoard,
  addGroup,
  loadBoards,
  removeBoard,
} from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { WorkSpaceSideBar } from './WorkSpaceSideBar'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { useParams } from 'react-router'

export function WorkSpaceBoard() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  useEffect(() => {
    loadBoards()
  }, [])
  useEffect(() => {
    if (boardId) {
      setSelectedBoard(boards.find((board) => board._id === boardId))
    } else {
      setSelectedBoard(boards[0])
    }
  }, [boardId, boards])

  //TODO add user to own the added board
  function onAddBoard() {
    addBoard()
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
    <div className="main-layout">
      <WorkSpaceSideBar {...{ onRemoveBoard, onAddBoard }} />
      <section className="work-space-board">
        <div className="workspace-board-header">
          <BoardHeader board={selectedBoard} />
          <BoardTabs />
          <BoardFilter />
        </div>
        {!!boards && (
          <BoardViewList board={selectedBoard} onAddGroup={onAddGroup} />
        )}
      </section>
    </div>
  )
}
