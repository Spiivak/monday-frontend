import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/img/monday-logo-x2.png'
import { login, logout, signup } from '../../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
import { useNavigate } from 'react-router-dom'
export function HomeHeader() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin1(credentials) {
    const newCredentials = {
      username: 'dimarevelson@gmail.com',
      password: '123123',
    }
    try {
      const user = await login(newCredentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/workspace')
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onLogin2(credentials) {
    const newCredentials = {
      username: 'navedavid@gmail.com',
      password: '123123',
    }
    try {
      const user = await login(newCredentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/workspace')
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
      </div>
      <div className="left flex gap16">
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
          <button
            onClick={onLogin1}
            className={'get-started-btn flex align-center justify-center'}>
            Get Started
          </button>
          <button
            onClick={onLogin2}
            className={'get-started-btn flex align-center justify-center'}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
