import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { DatePreview } from './cellsPreview/DatePreview'
import { CalenderIcon } from '../../../../Icons'
import { utilService } from '../../../../../services/util.service'

export function DatePickerC({
  task,
  cmpId,
  handleUpdateTask,
  cmpsOrder,
  loggedInUser,
}) {
  const [dateModal, setDateModal] = useState(false)
  const colName = cmpsOrder.find((cmp) => cmp.type === 'DatePicker')?.title
  const divRef = useRef()
  const dateFormat = 'YYYY/MM/DD'

  const oldValue = task['date' + cmpId]

  useEffect(() => {
    const handleClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDateModal(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  async function handleUpdateDate(date) {
    if (date) {
      try {
        const timestampDate = date.valueOf()
        const updatedTask = { ...task, ['date' + cmpId]: timestampDate }

        await handleUpdateTask('DatePicker', timestampDate, updatedTask)
        await handleUpdateTask(
          'Activity',
          {
            by: loggedInUser,
            createdAt: Date.now(),
            title: updatedTask.title,
            colName,
            oldValue:
              utilService.formatDate(oldValue) === 'NaN Invalid Date'
                ? '-'
                : utilService.formatDate(oldValue),
            newValue: utilService.formatDate(timestampDate),
          },
          updatedTask
        )
      } catch (err) {
        console.error('Cannot change date', err)
      } finally {
        setDateModal(false)
      }
    }
  }

  async function removeDate(ev) {
    try {
      ev.stopPropagation()
      const updatedTask = { ...task, ['date' + cmpId]: null }

      await handleUpdateTask('DatePicker', null, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          by: loggedInUser,
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: utilService.formatDate(oldValue),
          newValue: '-',
        },
        updatedTask
      )
    } catch (err) {
      console.error('Cannot clear dates', err)
    }
  }

  return (
    <div ref={divRef} className="cell date-picker-cell">
      {task['date' + cmpId] && !dateModal ? (
        <DatePreview {...{ setDateModal, removeDate, task, cmpId, divRef }} />
      ) : (
        <div className="empty-date-cell" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              left: '50px',
              top: '3px',
            }}
            onClick={() => setDateModal(!dateModal)}
          >
            <CalenderIcon />
          </div>
          <DatePicker
            style={{
              opacity: '0',
              padding: '0',
              width: '115px',
            }}
            format={dateFormat}
            onChange={handleUpdateDate}
            onClick={() => setDateModal(true)}
            onBlur={() => setDateModal(false)}
            defaultValue={
              task['date' + cmpId] ? dayjs(task['date' + cmpId]) : null
            }
            open={dateModal}
            autoFocus={dateModal}
          />
        </div>
      )}
    </div>
  )
}
