import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export function DatePickerC({ task, cmpId, handleUpdateTask }) {
  const [dateModal, setDateModal] = useState(false)

  const dateFormat = 'YYYY/MM/DD'

  async function handleUpdateDate(date) {
    if (date) {
      try {
        const timestampDate = date.valueOf()
        await handleUpdateTask('DatePicker', timestampDate, task)
        setDateModal(false)
      } catch (err) {
        console.log('cannot change date', err)
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

  return (
    <div className="cell">
      {task['date' + cmpId] && !dateModal ? (
        <div
          onClick={() => {
            setDateModal(true)
          }}
        >
          {formatDate(task['date' + cmpId])}
        </div>
      ) : (
        <DatePicker
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
