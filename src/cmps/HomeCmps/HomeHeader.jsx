import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/img/monday-logo-x2.png'
export  function HomeHeader() {
  return (
    <header className='home-header full flex space-between'>
      <div className="right flex">
        <img src={Logo} alt="logo" />
        <div className="links flex align-center">
          <NavLink>Products</NavLink>
          <NavLink>Teams</NavLink>
          <NavLink>Platform</NavLink>
          <NavLink>Resources</NavLink>
        </div>
      </div>
      <div className="left flex gap16">
        <div className="more-links flex gap16">
          <NavLink>Pricing</NavLink>
          <NavLink>Contact sales</NavLink>
        </div>
        <div className="user-actions flex gap16">
          <NavLink>Login</NavLink>
          <button className='get-started-btn'>Get Started</button>
        </div>
      </div>
    </header>
  )
}
