import { useState } from 'react'
import { utilService } from '../../../../../../services/util.service'
import { NavigationChevronDownIcon, TimeIcon } from '../../../../../Icons'
import { useSelector } from 'react-redux'
export function MsgsLogPreview({ activeTask, activeBoard, onAddMsgLog }) {
  const [msg, setMsg] = useState('')
  const user = useSelector((storeState) => storeState.userModule.user)

  const selectedLog = activeTask
  ? activeTask.msgs || []
  : activeBoard.groups.flatMap((group) =>
  group.tasks.flatMap((task) => task.msgs)
  )

  selectedLog.sort((a, b) => b.createdAt - a.createdAt)

  function handleChange(ev) {
    const target = ev.target
    const value = target.value
    setMsg(value)
  }

  function handleSubmit(ev) {
    const newMsgLog = { createdBy: user, createdAt: Date.now(), msg: msg }
    setMsg('')
    onAddMsgLog(newMsgLog)
  }

  return (
    <div className="msg-log flex column align-center">
      <form
        className="relative"
        style={{
          width: '85%',
          marginBlockStart: '16px',
          marginBlockEnd: '32px',
        }}
        onSubmit={(ev) => {
          ev.preventDefault()
          handleSubmit(ev)
        }}>
        <input
          value={msg}
          type="text"
          style={{
            width: '100%',
          }}
          onChange={handleChange}
        />
        <button
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            translate: '-20% -50%',
          }}
          className="btn-ctn small-primary">
          Send
        </button>
      </form>
      {selectedLog.map((msgLog) => {
        if (!msgLog) return null

        return (
          <div
            className="flex column gap16"
            style={{
              width: '85%',
              border: '1px solid #d0d4e4',
              borderRadius: '8px',
              padding: '16px',
              marginBlockEnd: '16px',
            }}
            key={msgLog.createdAt}>
            <div className="card-header flex space-between align-center">
              <div className="user-name-wrapper flex align-center gap12">
                <img
                  src={msgLog.createdBy.imgUrl}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span>{msgLog.createdBy.fullname}</span>
              </div>
              <span className="time-format flex align-center gap4">
                <TimeIcon />
                {utilService.timeDiff(msgLog.createdAt)}
              </span>
            </div>
            <span>{msgLog.msg}</span>
          </div>
        )
      })}
    </div>
  )
}
