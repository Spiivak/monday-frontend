import { Dropdown } from 'antd'
import Input from '@mui/joy/Input'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PersonRoundedIcon } from '../../Icons'
import { MemberHoverModal } from './modals/MemberHoverModal'

export function MemberPicker({ task, cmpId, handleUpdateTask }) {
  const users = useSelector((storeState) => storeState.userModule.users)

  function handleUpdateUser(selectedUser) {
    handleUpdateTask('MemberPicker', selectedUser, task)
  }

  const suggestedUsers = users.filter(
    (user) =>
      !task['members' + cmpId]?.some((member) => member._id === user._id)
  )

  const currentUsers = users.filter((user) =>
    task['members' + cmpId]?.some((member) => member._id === user._id)
  )

  const items = [
    {
      key: '1',
      label: (
        <Input
          placeholder="Search names, roles or teams"
          size="sm"
          type="text"
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex gap8 row">
          {currentUsers.map((user) => (
            <div key={user._id} className="flex align-center gap8">
              <img
                src={user.imgUrl}
                alt={user.fullname}
                style={{
                  width: '30px',
                  height: '30px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <h5>{user.fullname}</h5>
              <button onClick={() => handleUpdateUser(user)}>X</button>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}>
          <h5>Suggested people</h5>
        </div>
      ),
    },
    ...suggestedUsers.map((user, idx) => {
      return {
        key: 4 + idx,
        label: (
          <div className="flex gap8 column">
            <div
              key={user._id}
              onClick={() => handleUpdateUser(user)}
              className="flex align-center gap8">
              <img
                src={user.imgUrl}
                style={{
                  width: '30px',
                  height: '30px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <h5>{user.fullname}</h5>
            </div>
          </div>
        ),
      }
    }),
  ]

  return (
    <>
      <div className="cell member-picker-cell">
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}>
          <div className="cell">
            {task['members' + cmpId] && task['members' + cmpId].length > 0 ? (
              <div className="avatars-wrapper">
                {task['members' + cmpId].map((member) => (
                  <div className="avatar-logo" key={member._id}>
                    <img src={member.imgUrl} alt="" style={{width: '32px', height: '32px'}}/>
                      <MemberHoverModal member={member}
                      />
                  </div>
                ))}
              </div>
            ) : (
              <div className="avatars-wrapper" style={{ opacity: '0.2' }}><PersonRoundedIcon /></div>
            )}
          </div>
        </Dropdown>
      </div>
    </>
  )
}
