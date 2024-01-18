import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/img/tabs/anotherday-logo.png'
import { login, logout, signup } from '../../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
import { useNavigate } from 'react-router-dom'
export function HomeHeader() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)
  useEffect(() => {
    if(!user) navigate('/')
    socketService.login(user._id)
    return () => {
      socketService.logout()
    }
  }, [user])
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
            onClick={()=>{navigate('/workspace')}}
            className={'get-started-btn flex align-center justify-center'}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
