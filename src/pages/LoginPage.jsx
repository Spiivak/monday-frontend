import { Widgets } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { EditableText } from '../cmps/Workspace/board/editableText/EditableText'

export function LoginPage() {
  return (
    <div className='flex' style={{ width: '100%', height: '100dvh',boxSizing:'border-box', backgroundColor: 'blue' }}>
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
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            User1
          </button>
          <button
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            User2
          </button>
          <button
            className="btn-txt medium-sec"
            style={{ border: '1px solid darkgray' }}>
            User3
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
      <div style={{width:'40%', height:'100%'}}>
        <img style={{width:'100%', height:'100%', objectFit: 'cover'}}
          src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png"
          alt=""
        />
      </div>
    </div>
  )
}
