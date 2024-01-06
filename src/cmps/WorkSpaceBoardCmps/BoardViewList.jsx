import { Add } from '@mui/icons-material'
import { BoardViewGroup } from '../WorkSpaceBoardCmps/BoardViewGroup'
import React from 'react'
export function BoardViewList({ board, onAddGroup }) {
  return (
    <section className="board-view-list">
      {!!board && (
        <>
          {board.groups.map((group) => (
            <BoardViewGroup
              boardId={board._id}
              key={group.id}
              group={group}
              cmpsOrder={board.cmpsOrder}
            />
          ))}
          <button className='btn-outline medium-primary' onClick={()=>onAddGroup(board._id)}><Add/>Add new group</button>
        </>
      )}
    </section>
  )
}
