import { BoardViewGroup } from '../WorkSpaceBoardCmps/BoardViewGroup'
import React from 'react'
export function BoardViewList({ board }) {
  return (
    <section className="board-view-list">
      {!!board && board.groups.map((group) => (
        <BoardViewGroup key={group.id} group={group} cmpsOrder={board.cmpsOrder}/>
      ))}
    </section>
  )
}
