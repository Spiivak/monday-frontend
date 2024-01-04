import React from 'react'
import { BoardHeaderTitle } from './BoardHeaderTitle'

// ICONS
import Info from '../../assets/icons/Info.svg'
import Favorite from '../../assets/icons/Favorite.svg'
import Menu from '../../assets/icons/Menu.svg'
import Invite from '../../assets/icons/Invite.svg'
import Activity from '../../assets/icons/Activity.svg'


export function BoardHeader({}) {
  return (
    <section className="board-header">
      <BoardHeaderTitle>Board Title</BoardHeaderTitle>

      <div className="header-btns">
        <div className="left-btns">
          <button className='btn-icon medium-transparent'><img src={Info} alt="" /></button>
          <button className='btn-icon medium-transparent'><img src={Favorite} alt="" /></button>
        </div>
        <div className="right-btns">
          {/* <button>activities</button> */}
          <button className='btn-icon medium-transparent'><img src={Activity} alt="" /></button>
          <button className='btn-icon medium-transparent flex gap8'><img src={Invite} alt="" />Invite / 4</button>
          <button className='btn-icon medium-transparent'><img src={Menu} alt="" /></button>
        </div>
      </div>
    </section>
  )
}
