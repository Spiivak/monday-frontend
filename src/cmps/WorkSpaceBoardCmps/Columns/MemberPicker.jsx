import { Dropdown } from 'antd'
import Input from '@mui/joy/Input'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export function MemberPicker({ task, handleUpdateTask }) {
  const users = useSelector((storeState) => storeState.userModule.users)
  const [selectedMember, setSelectedMember] = useState(null)
  const hoverTimeoutRef = useRef(null)
  const hoverEndTimeoutRef = useRef(null)
  const shouldActiveRef = useRef(false)

  function handleHover(member) {
    clearTimeout(hoverEndTimeoutRef.current)
    shouldActiveRef.current = true
    hoverTimeoutRef.current = setTimeout(() => {
      if (shouldActiveRef.current) {
        setSelectedMember(member)
      }
    }, 1000)
  }

  function handleHoverEnd() {
    clearTimeout(hoverTimeoutRef.current)
    shouldActiveRef.current = false
    hoverEndTimeoutRef.current = setTimeout(() => {
      if (!shouldActiveRef.current) {
        setSelectedMember(null)
      }
    }, 500)
  }

  function handleUpdateUser(selectedUser) {
    handleUpdateTask('MemberPicker', selectedUser, task)
  }

  const suggestedUsers = users.filter(
    (user) => !task.members?.some((member) => member._id === user._id)
  )

  const currentUsers = users.filter((user) =>
    task.members?.some((member) => member._id === user._id)
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
          }}
        >
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
              className="flex align-center gap8"
            >
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
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        className="cell"
      >
        {task.members && task.members.length > 0 ? (
          <div className="avatars-wrapper">
            {task.members.map((member) => (
              <div className="avatar-logo" key={member._id}>
                <img
                  onMouseEnter={() => handleHover(member)}
                  src={member.imgUrl}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="avatars-wrapper">No members selected</div>
        )}

        {!!selectedMember && (
          <div
            onMouseEnter={() => (shouldActiveRef.current = true)}
            onMouseLeave={() => (shouldActiveRef.current = false)}
            className="member-details-wrapper"
          >
            <div className={`member-details`}>
              <div className="avatar-logo">
                <img src={selectedMember.imgUrl} alt="" />
              </div>
              <div className="member-details-content">
                <h4>{selectedMember.fullname}</h4>
                <p>[logo] Time at current location, location</p>
                <h4>membership label</h4>
              </div>
              <div className="member-detail-btns">
                <button>Btn 1</button>
                <button>Btn 2</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dropdown>
  )
}
