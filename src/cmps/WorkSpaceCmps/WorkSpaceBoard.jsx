import { BoardFilter } from "../WorkSpaceBoardCmps/BoardFilter"
import { BoardTabs } from "../WorkSpaceBoardCmps/BoardTabs"
import React from "react"

import { BoardHeader } from "../WorkSpaceBoardCmps/BoardHeader"
import { WorkSpaceSideBar } from "../BoardCmps/WorkSpaceSideBar"

export function WorkSpaceBoard() {
  return (
    <div className="main-layout">
      <WorkSpaceSideBar />
      <section className="work-space-board">
        <BoardHeader />
        <BoardTabs />
        <BoardFilter />
        <section className="board-view"></section>
      </section>
    </div>
  )
}
