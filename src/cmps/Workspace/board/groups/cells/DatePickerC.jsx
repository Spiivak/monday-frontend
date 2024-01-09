import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DatePreview } from './cellsPreview/DatePreview'

export function DatePickerC({ task, cmpId, handleUpdateTask }) {
  const [dateModal, setDateModal] = useState(false)

  const dateFormat = 'YYYY/MM/DD'

  async function handleUpdateDate(date) {
    if (date) {
      try {
        const timestampDate = date.valueOf()
        await handleUpdateTask('DatePicker', timestampDate, task)
      } catch (err) {
        console.log('cannot change date', err)
      } finally {
        setDateModal(false)
      }
    }
  }

  async function removeDate(ev) {
    try {
      ev.stopPropagation()
      await handleUpdateTask('DatePicker', null, task)
    } catch (err) {
      console.error('Cannot clear dates', err)
    }
  }

  return (
    <div className="cell date-picker-cell">
      {task['date' + cmpId] && !dateModal ? (
        <DatePreview {...{ setDateModal, removeDate, task, cmpId }} />
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
