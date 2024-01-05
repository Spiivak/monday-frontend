import { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

import { Button, Dropdown } from 'antd'

export function DynamicTableCell({ cmp, task, onTaskUpdate }) {
  function handleUpdateTask(cmpType, data, task) {
    onTaskUpdate(cmpType, data, task)
  }

  switch (cmp) {
    case 'StatusPicker':
      return <StatusPicker {...{ task, handleUpdateTask }} />
    case 'MemberPicker':
      return <MemberPicker {...{ task, handleUpdateTask }} />
    case 'DatePicker':
      return <DatePickerC {...{ task, handleUpdateTask }} />
    case 'DescriptionPicker':
      return <DescriptionPicker {...{ task, handleUpdateTask }} />
    case 'TimeLinePicker':
      return <TimeLinePicker {...{ task, handleUpdateTask }} />
  }
}

function StatusPicker({ task, handleUpdateTask }) {
  const items = [
    {
      key: '1',
      backgroundColor: '#00C875',
      status: 'done',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{ backgroundColor: '#00C875', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'done', task)}>
          done
        </button>
      ),
    },
    {
      key: '2',
      backgroundColor: '#FDAB3D',
      status: 'in-progress',
      label: (
        <button
          className="btn-ctn medium-primary "
          style={{ backgroundColor: '#FDAB3D', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'in-progress', task)}>
          in-progress
        </button>
      ),
    },
    {
      key: '3',
      backgroundColor: '#E2445C',
      status: 'stuck',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{ backgroundColor: '#E2445C', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'stuck', task)}>
          stuck
        </button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: <button className="label-btn">Edit Labels</button>,
    },
  ]
  const bgc = items.reduce((acc,item) => {
    if (item.status === task.status) {
      return item.backgroundColor
    }
    return acc
  },'')

  return (
    <Dropdown
      rootClassName="dropdown-status-picker"
      menu={{
        items,
      }}
      trigger={['click']}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}>
      <div className="cell">
        <button className="label-btn" style={{ backgroundColor: bgc }}>
          {task.status || 'empty'}
        </button>
      </div>
    </Dropdown>
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
      }}>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
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
      </div>
    </Dropdown>
  )
}

function DatePickerC({ task, handleUpdateTask }) {
  const dateFormat = 'YYYY/MM/DD'

  function handleUpdateDate(date) {
    if (date) {
      const timestampDate = date.valueOf()
      handleUpdateTask('DatePicker', timestampDate, task)
    }
  }
  return (
    <div className="cell">
      {task.date ? (
        <DatePicker
          defaultValue={dayjs(task.date)}
          format={dateFormat}
          onChange={handleUpdateDate}
        />
      ) : (
        <DatePicker format={dateFormat} onChange={handleUpdateDate} />
      )}
    </div>
  )
}

function DescriptionPicker({ task, handleUpdateTask }) {
  const [isActive, setIsActive] = useState(false)
  const [desc, setDesc] = useState(task.description)
  handleUpdateTask = useRef(utilService.debounce(handleUpdateTask))

  function handleUpdateDesc(ev) {
    ev.preventDefault()
    const txt = ev.target.value
    setDesc(txt)
  }

  function removeLeadingSlashN(description) {
    let modifiedDescription = description

    while (modifiedDescription && modifiedDescription.startsWith('\n')) {
      modifiedDescription = modifiedDescription.slice(2)
    }

    return modifiedDescription
  }

  const descriptionToShow = removeLeadingSlashN(desc) || 'empty'

  useEffect(() => {
    handleUpdateTask.current('DescriptionPicker', desc, task)
  }, [desc])

  return (
    <div className="cell">
      <h4
        onClick={() => {
          setIsActive((a) => !a)
        }}>
        {descriptionToShow}
      </h4>
      <div className={`cell-context ${isActive ? 'active' : 'hidden'}`}>
        <textarea
          placeholder="Add description"
          value={desc}
          onChange={handleUpdateDesc}
          onBlur={() => {
            setIsActive((a) => !a)
          }}
        />
      </div>
    </div>
  )
}

function TimeLinePicker({ task, handleUpdateTask }) {
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY/MM/DD'

  function handleDateChange(dates) {
    if (dates) {
      const [startDate, endDate] = dates
      const timestampStartDate = startDate.valueOf()
      const timestampEndDate = endDate.valueOf()

      handleUpdateTask(
        'TimeLinePicker',
        [timestampStartDate, timestampEndDate],
        task
      )
    }
  }

  return (
    <div className="cell">
      {task.timeline ? (
        <RangePicker
          defaultValue={task.timeline.map((timestamp) => dayjs(timestamp))}
          format={dateFormat}
          onChange={handleDateChange}
        />
      ) : (
        <RangePicker format={dateFormat} onChange={handleDateChange} />
      )}
    </div>
  )
}
