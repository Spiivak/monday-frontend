import React from 'react'
import { BoardHeaderTitle } from './BoardHeaderTitle'
export function BoardHeader({}) {
  return (
    <section className="board-header">
      <BoardHeaderTitle>Board Title</BoardHeaderTitle>

      <div className="header-btns">
        <div className="left-btns">
          <button>description</button>
          <button>favorites</button>
        </div>
        <div className="right-btns">
          <button>activities</button>
          <button>invite</button>
          <button>more</button>
        </div>
      </div>
    </section>
  )
}
