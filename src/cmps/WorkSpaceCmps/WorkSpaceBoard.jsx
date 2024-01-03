import { BoardFilter } from '../WorkSpaceBoardCmps/BoardFilter'
import { BoardTabs } from '../WorkSpaceBoardCmps/BoardTabs'
import React from 'react'

import { BoardHeader } from '../WorkSpaceBoardCmps/BoardHeader'

export function WorkSpaceBoard() {
  return (
    <section className="work-space-board">
      <BoardHeader />
      <BoardTabs />
      <BoardFilter />
      <section className="board-view"></section>
    </section>
  )
}
