import { Popover } from '@mui/material'
import React, { useEffect, useRef } from 'react'

export function MemberHoverModal({ member }) {

  if(!member) return
  return (
    <div className='member-modal flex column space-between gap8'>
      <div className="wrapper flex align-center gap16">
        <div className="member-avatar flex gap8">
          <img src={member.imgUrl} alt="" style={{ width: '50px', height: '50px' }} />
        </div>
        <div className="member-details flex column">
          <h3>{member.fullname}</h3>
          <span>{member.username}</span>
        </div>
      </div>
      <div className="member-actions flex">
        <span className=''>Contact Details</span>
        <span className=''>Ask for an update</span>
      </div>
    </div>
  )
}

