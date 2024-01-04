import { useState } from 'react'

export function DynamicTableCell({ cmp, task, onTaskUpdate }) {
  function handleUpdateTask(cmpType ,data, task) {
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
        <button onClick={() => handleUpdateTask('StatusPicker','done',task)}>done</button>
        <button onClick={() => handleUpdateTask('StatusPicker','in-progress',task)}>
          in-progress
        </button>
        <button onClick={() => handleUpdateTask('StatusPicker','stuck',task)}>stuck</button>
      </div>
    </div>
  )
}

function MemberPicker({ task, onTaskUpdate }) {
  return (
    <button>
      <h4>{task.memberIds}</h4>
    </button>
  )
}

function DatePicker({ task, onTaskUpdate }) {
  return (
    <button>
      <h2>{task.date}</h2>
    </button>
  )
}
