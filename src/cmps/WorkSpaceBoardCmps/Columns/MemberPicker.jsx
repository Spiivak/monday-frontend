import { Dropdown } from 'antd'
import Input from '@mui/joy/Input'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PersonRoundedIcon } from '../../Icons'
import { MemberHoverModal } from './modals/MemberHoverModal'
import { Tooltip, styled, tooltipClasses } from '@mui/material'

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

  function renderAvatars() {
    const memberAvatars = task['members' + cmpId]?.slice(0, 2) || []
    return memberAvatars.map((member) => (
      <div className="avatar-logo" key={member._id}>
        <img src={member.imgUrl} alt="" />
        <MemberHoverModal member={member} />
      </div>
    ))
  }

  const MultiLineTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
      whiteSpace: 'pre-line',
    },
  })

  function renderOverflowIndicator() {
    const additionalMembers = task['members' + cmpId]?.slice(2) || []
    const additionalMembersCount = additionalMembers.length

    if (additionalMembersCount > 0) {
      return (
        <div className="overflow-indicator flex align-center justify-center">
          <MultiLineTooltip title={additionalMembers.map(member => member.fullname).join('\n')} arrow>
            <div className="overflow-tooltip-indicator">+{additionalMembersCount}</div>
          </MultiLineTooltip>
        </div>
      )
    }
    return null
  }

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
          }}
        >
          <div className="cell">
            {currentUsers.length > 0 ? (
              <div className="avatars-wrapper flex align-center">
                {renderAvatars()}
                {renderOverflowIndicator()}
              </div>
            ) : (
              <div className="avatars-wrapper" style={{ opacity: '0.2' }}>
                <PersonRoundedIcon />
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </>
  )
}