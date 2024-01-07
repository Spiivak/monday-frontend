import React from 'react'
import { NavLink } from 'react-router-dom'
import {HomeIcon, MyWeekIcon } from '../Icons'

export function SideBarLinks() {
  return (
    <div className="side-bar-link-container flex column">
      <NavLink to="/" className={'flex align-center gap8'}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/my-work" className={'flex align-center gap8 my-work'}>
        <MyWeekIcon />
        <span>My work</span>
      </NavLink>
    </div>
  )
}
