import { Add } from '@mui/icons-material'
import { BoardGroupPreview } from './BoardGroupPreview'
import React from 'react'
export function BoardGroupList({ board, onAddGroup }) {
  return (
    <section className="board-view-list">
      {!!board && (
        <>
          {board.groups.map((group) => (
            <BoardGroupPreview
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
