import React from 'react'
import { BoardHeaderTitle } from './BoardHeaderTitle'

// ICONS
import {
  ActivityIcon,
  FavoriteIcon,
  InfoIcon,
  InviteMembersIcon,
  MenuIcon,
} from '../Icons'

export function BoardHeader({board}) {
  return (
    <section className="board-header">
      {!!board && <BoardHeaderTitle>{board.title}</BoardHeaderTitle>}

      <div className="header-btns">
        <div className="left-btns">
          <button className="btn-icon medium-transparent">
            <InfoIcon />
          </button>
          <button className="btn-icon medium-transparent">
            <FavoriteIcon />
          </button>
        </div>
        <div className="right-btns">
          {/* <button>activities</button> */}
          <button className="btn-icon medium-transparent">
            <ActivityIcon />
          </button>
          <button className="btn-icon medium-transparent flex gap8">
            <InviteMembersIcon />
            Invite / 4
          </button>
          <button className="btn-icon medium-transparent">
            <MenuIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
