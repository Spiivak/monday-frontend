import React from 'react'
import { NavLink } from 'react-router-dom'

export  function HomeHeader() {
  return (
    <header className='home-header full flex space-between'>
      <div className="right flex">
        <img src="" alt="logo" />
        <div className="links flex">
          <ul className='clean-list'>
            <li>Products</li>
            <li>Teams</li>
            <li>Platform</li>
            <li>Resources</li>
          </ul>
          {/* <NavLink>Products</NavLink> */}
        </div>
      </div>
      <div className="left">
        <div className="more-links">
          <ul>
            <li>Pricing</li>
            <li>Contact sales</li>
          </ul>
        </div>
        <div className="user-actions">
          <button>Login</button>
          <button>Get Started</button>
        </div>
      </div>
    </header>
  )
}
