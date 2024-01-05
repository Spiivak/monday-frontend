import { BoardViewList } from '../WorkSpaceBoardCmps/BoardViewList'
import { BoardFilter } from '../WorkSpaceBoardCmps/BoardFilter'
import { BoardTabs } from '../WorkSpaceBoardCmps/BoardTabs'

import { BoardHeader } from '../WorkSpaceBoardCmps/BoardHeader'
import { useEffect } from 'react'
import { loadBoards, removeBoard } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { WorkSpaceSideBar } from './WorkSpaceSideBar'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function WorkSpaceBoard() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  useEffect(() => {
    loadBoards()
  }, [])

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg('Board removed successfully')
    } catch (err) {
      showErrorMsg('Cant remove board, try again.')
    }
  }

  return (
    <div className="main-layout">
      <WorkSpaceSideBar {...{ onRemoveBoard }} />
      <section className="work-space-board">
        <BoardHeader />
        <BoardTabs />
        <BoardFilter />
        {!!boards && <BoardViewList board={boards[0]} />}
      </section>
    </div>
  )
}
