import { Widgets } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { EditableText } from '../cmps/Workspace/board/editableText/EditableText'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { login } from '../store/actions/user.actions'

export function LoginPage() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin1(credentials) {
    const newCredentials = {
      username: 'navedavid@gmail.com',
      password: '123123',
    }
    try {
      const user = await login(newCredentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/home')
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onLogin2(credentials) {
    const newCredentials = {
      username: 'dimarevelson@gmail.com',
      password: '123123',
    }
    try {
      const user = await login(newCredentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/home')
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onLogin3(credentials) {
    const newCredentials = {
      username: 'edenspivak@gmail.com',
      password: '123',
    }
    try {
      const user = await login(newCredentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      navigate('/home')
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  return (
    <div
      className="flex"
      style={{
        width: '100%',
        height: '100dvh',
        boxSizing: 'border-box',
        backgroundColor: 'blue',
      }}>
      <div
        className="flex column align-center justify-center gap16"
        style={{
          width: '60%',
          height: '100%',
          backgroundColor: 'white',
          gap: '38px',
        }}>
        <div className="login-header">
          <h2>Welcome to anyday.com</h2>
          <p>Get started - it's free. No credit needed.</p>
        </div>
        <div
          className="quick-login-options flex column"
          style={{ width: '400px', gap: '16px' }}>
          <button
            onClick={onLogin1}
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            Nave's User
          </button>
          <button
            onClick={onLogin2}
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            Dima's User
          </button>
          <button
            onClick={onLogin3}
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            Eden's User
          </button>
        </div>
        <div
          style={{ width: '400px', textAlign: 'center' }}
          className="ds-divider">
          -------------- Or --------------
        </div>
        <form
          style={{ width: '400px', gap: '16px' }}
          className="flex column"
          onSubmit={(ev) => {
            ev.preventDefault()
          }}>
          <input type="text" placeholder="name@company.com" />
          <button className="btn-ctn medium-primary" type="submit">
            Continue
          </button>
        </form>
        <div style={{ textAlign: 'center' }}>
          <p>By proceeding, you agree to the</p>
          <p>
            <a style={{ color: '#0073ea' }} href="">
              Terms of Service
            </a>{' '}
            and{' '}
            <a style={{ color: '#0073ea' }} href="">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
      <div style={{ width: '40%', height: '100%' }}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png"
          alt=""
        />
      </div>
    </div>
  )
}
