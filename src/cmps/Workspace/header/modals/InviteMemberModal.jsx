import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '../../../Icons'
import { loadUsers } from '../../../../store/actions/user.actions'
import { useSelector } from 'react-redux'
import { saveBoard } from '../../../../store/actions/board.actions'

export function InviteMemberModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [selectedUser, setSelectedUser] = useState(null)
  const modalRef = useRef()
  const users = useSelector((storeState) => storeState.userModule.users)
  const boardMembers = useSelector(
    (storeState) => storeState.boardModule.selectedBoard?.members
  )
  const selectedBoard = useSelector(
    (storeState) => storeState.boardModule.selectedBoard
  )
  useEffect(() => {
    loadUsers()
  }, [])

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  async function handleInvite(user) {
    try {
      selectedBoard.members.push(user)
      await saveBoard(selectedBoard)
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="overlay"></div>
      <div ref={modalRef} className="invite-member-modal">
        <button
          onClick={onClose}
          className="absolute btn-icon small-transparent"
          style={{ top: '-25px', left: '525px' }}
        >
          <CloseIcon />
        </button>
        <div className="header">
          <h2>Invite to Monday</h2>
        </div>

        <div className="body flex column">
          <div className="invite">
            <label htmlFor="invite">Invite with email</label>
            <input
              type="email"
              name="invite"
              placeholder="Enter one or more email addresses"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {users
              .filter(
                (user) =>
                  !boardMembers.some(
                    (boardMember) => boardMember._id === user._id
                  )
              )
              .map((user) => (
                <div
                  style={{
                    margin: '5px 0',
                    padding: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedUser === user ? '#d0defe' : '',
                    borderRadius: '4px',
                  }}
                  className="selection flex gap8 align-center"
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                    }}
                    src={user.imgUrl}
                    alt={user.username}
                  />
                  <div>{user.fullname}</div>
                </div>
              ))}
          </div>
          <div className="select flex gap16">
            <div className="option flex gap8">
              <input
                type="radio"
                name="role"
                value="member"
                checked={role === 'member'}
                onChange={handleRoleChange}
              />
              <label htmlFor="member">Member</label>
            </div>
            <div className="option flex gap8">
              <input
                type="radio"
                name="role"
                value="viewer"
                checked={role === 'viewer'}
                onChange={handleRoleChange}
              />
              <label htmlFor="viewer">Viewer (Read Only)</label>
            </div>
          </div>

          <div className="buttons flex">
            <button
              onClick={() => handleInvite(selectedUser)}
              className="btn-ctn medium-primary"
            >
              Invite
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
