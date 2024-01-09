import { Add } from '@mui/icons-material'
import { BoardGroupPreview } from './BoardGroupPreview'
import React from 'react'
import { AddIcon } from '../../../Icons'
import { BoardGroupPreview2 } from './BoardGroupPreview2'
export function BoardGroupList({ board, onAddGroup }) {
  return (
    <section className="board-view-list">
      {!!board && (
        <>
          {board.groups.map((group) => (
            <BoardGroupPreview2
              boardId={board._id}
              key={group.id}
              group={group}
              cmpsOrder={board.cmpsOrder}
            />
          ))}
          <button
            className="btn-outline medium-primary add-new-group"
            onClick={() => onAddGroup(board._id)}
          >
            <AddIcon />
            Add new group
          </button>
        </>
      )}
    </section>
  )
}
