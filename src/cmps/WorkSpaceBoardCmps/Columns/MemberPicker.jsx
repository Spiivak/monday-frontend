import { Dropdown } from 'antd'
import { useRef, useState } from 'react'

export function MemberPicker({ task, handleUpdateTask }) {
  const [isActive, setIsActive] = useState(false)
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

  const items = [
    {
      key: '1',
      label: <h4>labels</h4>,
    },
    {
      key: '2',
      label: <input type="text"></input>,
    },
    {
      key: '3',
      label: <h4>suggested people</h4>,
    },
    {
      key: '4',
      label: <button>Avatars</button>,
    },
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
        {(!!task?.members && (
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
        )) ||
          'empty'}
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
