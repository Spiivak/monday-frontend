import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/img/monday-logo-x2.png'
import { login, logout, signup } from '../../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
export function HomeHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }
  return (
    <header className="home-header full flex space-between">
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
          {/* {user && (
            <span className="user-info">
              <Link to={`user/${user._id}`}>
                {user.imgUrl && <img src={user.imgUrl} />}
                {user.fullname}
              </Link>
              <span className="score">{user.score?.toLocaleString()}</span>
              <button onClick={onLogout}>Logout</button>
            </span>
          )}
          {!user && (
            <section className="user-info">
              <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            </section>
          )} */}
          <NavLink to="/workspace" className={'get-started-btn flex align-center justify-center'}>Get Started </NavLink>
        </div>
      </div>
    </header>
  )
}
