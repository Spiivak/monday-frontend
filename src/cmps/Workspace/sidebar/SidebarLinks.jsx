import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, MyWeekIcon } from '../../Icons'

export function SidebarLinks() {
  return (
    <div className="side-bar-link-container flex column">
      <NavLink to="/workspace" className={'flex align-center gap8'}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/my_work" className={'flex align-center gap8 my-work'}>
        <MyWeekIcon />
        <span>My work</span>
      </NavLink>
    </div>
  )
}
