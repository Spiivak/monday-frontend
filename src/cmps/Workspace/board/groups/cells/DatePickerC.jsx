import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DatePreview } from './cellsPreview/DatePreview'

export function DatePickerC({ task, cmpId, handleUpdateTask, cmpsOrder }) {
  const [dateModal, setDateModal] = useState(false)
  const colName = cmpsOrder.find((cmp) => cmp.type === 'DatePicker')?.title
  const dateFormat = 'YYYY/MM/DD'

  const oldValue = task['date' + cmpId]

  async function handleUpdateDate(date) {
    if (date) {
      try {
        const timestampDate = date.valueOf()
        const updatedTask = { ...task, ['date' + cmpId]: timestampDate }

        await handleUpdateTask('DatePicker', timestampDate, updatedTask)
        await handleUpdateTask(
          'Activity',
          {
            createdAt: Date.now(),
            title: updatedTask.title,
            colName,
            oldValue: formatDate(oldValue),
            newValue: formatDate(timestampDate),
          },
          updatedTask
        )
      } catch (err) {
        console.log('Cannot change date', err)
      } finally {
        setDateModal(false)
      }
    }
  }
  function formatDate(timestamp) {
    const dateObj = new Date(timestamp)

    const dayNumber = dateObj.getDate()
    const monthAbbreviation = dateObj.toLocaleString('default', {
      month: 'short',
    })

    return `${dayNumber} ${monthAbbreviation}`
  }

  async function removeDate(ev) {
    try {
      ev.stopPropagation()
      const updatedTask = { ...task, ['date' + cmpId]: null }

      await handleUpdateTask('DatePicker', null, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: formatDate(oldValue),
          newValue: '-',
        },
        updatedTask
      )
    } catch (err) {
      console.error('Cannot clear dates', err)
    }
  }

  return (
    <div className="cell date-picker-cell">
      {task['date' + cmpId] && !dateModal ? (
        <DatePreview
          {...{ formatDate, setDateModal, removeDate, task, cmpId }}
        />
      ) : (
        <DatePicker
          style={{ opacity: '0', padding: '0', width: '115px' }}
          onClick={() => setDateModal(true)}
          format={dateFormat}
          onChange={handleUpdateDate}
          onBlur={() => setDateModal(false)}
          defaultValue={
            task['date' + cmpId] ? dayjs(task['date' + cmpId]) : null
          }
          open={dateModal}
          autoFocus={dateModal}
        />
      )}
    </div>
  )
}
