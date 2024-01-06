import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, WorkIcon } from '../Icons'

export function SideBarLinks() {
  return (
    <div className="side-bar-link-container flex column">
      <NavLink to="/" className={'flex align-center gap8'}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/my-work" className={'flex align-center gap8'}>
        <WorkIcon />
        <span>My Work</span>
      </NavLink>
    </div>
  )
}
