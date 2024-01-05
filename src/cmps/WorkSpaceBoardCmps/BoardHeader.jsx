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
    <section className="board-header flex align-center space-between">
      {!!board && <h2>{board.title}</h2>}

      <div className="header-btns flex space-between">
        <div className="left-btns flex align-center">
          <button className="btn-icon medium-transparent">
            <InfoIcon />
          </button>
          <button className="btn-icon medium-transparent">
            <FavoriteIcon />
          </button>
        </div>
        <div className="right-btns flex align-center">
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
