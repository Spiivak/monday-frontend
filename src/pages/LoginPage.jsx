import { Widgets } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { EditableText } from '../cmps/Workspace/board/editableText/EditableText'

export function LoginPage() {
  return (
    <div>
      <div
        className="flex column align-center"
        style={{
          width: '60vw',
          height: '100dvh',
          backgroundColor: 'pink',
        }}>
        <div className="login-header">
          <h2>Welcome to anyday.com</h2>
          <p>Get started - it's free. No credit needed.</p>
        </div>
        <div
          className="quick-login-options flex column gap16"
          style={{ width: '400px' }}>
          <button>User1</button>
          <button>User2</button>
          <button>User3</button>
        </div>
        <div
          style={{ width: '400px', textAlign: 'center' }}
          className="ds-divider">
          -------------- Or --------------
        </div>
        <form
          style={{ width: '400px' }}
          className="flex column"
          onSubmit={(ev) => {
            ev.preventDefault()
          }}>
          <input type="text" placeholder="name@company.com" />
          <button type="submit">continue</button>
        </form>
        <div style={{ textAlign: 'center' }}>
          <p>By proceeding, you agree to the</p>
          <p>
            <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
