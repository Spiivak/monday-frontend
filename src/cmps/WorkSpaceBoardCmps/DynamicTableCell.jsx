import { useRef, useState } from 'react'

export function DynamicTableCell({ cmp, task, onTaskUpdate }) {
  function handleUpdateTask(cmpType, data, task) {
    onTaskUpdate(cmpType, data, task)
  }

  switch (cmp) {
    case 'StatusPicker':
      return <StatusPicker task={task} handleUpdateTask={handleUpdateTask} />
    case 'MemberPicker':
      return <MemberPicker task={task} handleUpdateTask={handleUpdateTask} />
    case 'DatePicker':
      return <DatePicker task={task} handleUpdateTask={handleUpdateTask} />
  }
}

function StatusPicker({ task, handleUpdateTask }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      onClick={() => {
        setIsActive((a) => !a)
      }}
      className="cell">
      <h4>{task.status || 'empty'}</h4>
      <div className={`cell-context ${isActive ? 'active' : 'hidden'}`}>
        <button onClick={() => handleUpdateTask('StatusPicker', 'done', task)}>
          done
        </button>
        <button
          onClick={() => handleUpdateTask('StatusPicker', 'in-progress', task)}>
          in-progress
        </button>
        <button onClick={() => handleUpdateTask('StatusPicker', 'stuck', task)}>
          stuck
        </button>
      </div>
    </div>
  )
}

function MemberPicker({ task, handleUpdateTask }) {
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

  function handleClick() {
    setIsActive((a) => !a)
  }
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
      className="cell">
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
          className="member-details-wrapper">
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
      <div
        className={`member-add-selector ${isActive ? 'active' : 'hidden'}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
        >
        <div className="member-labels">labels</div>
        <div className="member-search">
          <input type="text" placeholder="search" />
        </div>
        <div className="member-suggestions">suggested members</div>
      </div>
    </div>
  )
}

function DatePicker({ task, handleUpdateTask }) {
  return (
    <div className="cell">
      <h4>{task.date || 'empty'}</h4>
    </div>
  )
}
