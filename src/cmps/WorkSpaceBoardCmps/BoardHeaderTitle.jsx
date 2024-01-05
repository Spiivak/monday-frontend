import React from 'react'
import { BoardIcon } from '../Icons'
export function BoardHeaderTitle({ children }) {
  return (
    <div className="title-wrapper">
      {/* <BoardIcon /> */}
      <h2 className="board-header-title">{children}</h2>
    </div>
  )
}
