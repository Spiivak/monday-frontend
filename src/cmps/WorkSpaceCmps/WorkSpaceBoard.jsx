import { BoardViewList } from "../WorkSpaceBoardCmps/BoardViewList"
import { BoardFilter } from "../WorkSpaceBoardCmps/BoardFilter"
import { BoardTabs } from "../WorkSpaceBoardCmps/BoardTabs"

import { BoardHeader } from "../WorkSpaceBoardCmps/BoardHeader"
import { useEffect } from "react"
import { loadBoards } from "../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { WorkSpaceSideBar } from "./WorkSpaceSideBar"

export function WorkSpaceBoard() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])
  console.log(boards)

  return (
    <div className="main-layout">
      <WorkSpaceSideBar />
      <section className="work-space-board">
        <BoardHeader />
        <BoardTabs />
        <BoardFilter />
        {!!boards && <BoardViewList board={boards[0]} />}
      </section>
    </div>
  )
}
