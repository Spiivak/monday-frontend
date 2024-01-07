import React from 'react'

export function MemberModal() {

  const {imgUrl, fullname, username } = member
  return (
    <div className='member-modal flex column' style={{ backgroundColor: 'red'}}>
      <div className="wrapper flex align-center">
      <div className="member-avatar">
        <img src={imgUrl} alt="" style={{ width: '30px', height: '30px'}}/>
      </div>
      <div className="member-details flex column">
        <h3>{fullname}</h3>
        <span>{username}</span>
        <span className='btn-icon medium-transparent'></span>
      </div>
      </div>
      <div className="member-actions flex">
        <button>Contact Details</button>
        <button>ASk for an update</button>
      </div>
    </div>
  )
}
