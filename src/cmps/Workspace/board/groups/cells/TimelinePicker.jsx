import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export function TimelinePicker({ task, cmpId, handleUpdateTask, group }) {
  const [dateModal, setDateModal] = useState(false)
  const [color, setColor] = useState('#333')
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    if (group?.style?.color) {
      const today = Date.now()
      if (!task['timeline' + cmpId] || task['timeline' + cmpId].length === 0 ) return
      const fromDate = task['timeline' + cmpId][0]
      const toDate = task['timeline' + cmpId][1]
      let percentile
      if (today <= fromDate) setColor(group.style.color)
      else if (today > fromDate && today < toDate) {
        percentile = Math.floor(
          100 - ((today - fromDate) / (toDate - fromDate)) * 100
        )
        setColor(
          `linear-gradient(to left, #333 ${percentile}%, ${group.style.color} ${percentile}%)`
        )
      } else setColor('#333')
    }
  }, [task['timeline' + cmpId]])

  async function handleDateChange(dates) {
    if (dates) {
      try {
        const [startDate, endDate] = dates
        const timestampStartDate = startDate.valueOf()
        const timestampEndDate = endDate.valueOf()
        await handleUpdateTask(
          'TimeLinePicker',
          [timestampStartDate, timestampEndDate],
          task
        )
      } catch (err) {
        console.log('cannot set dates', err)
      } finally {
        setDateModal(false)
      }
    }
  }

  function formatDateRange(timestamps) {
    if (timestamps.length !== 2) {
      throw new Error('Expected an array of two timestamps')
    }

    const [startTimestamp, endTimestamp] = timestamps
    const startDate = new Date(startTimestamp)
    const endDate = new Date(endTimestamp)

    const startDayNumber = startDate.getDate()
    const endDayNumber = endDate.getDate()
    const startMonthAbbreviation = startDate.toLocaleString('default', {
      month: 'short',
    })
    const endMonthAbbreviation = endDate.toLocaleString('default', {
      month: 'short',
    })

    return `${startDayNumber} ${startMonthAbbreviation} - ${endDayNumber} ${endMonthAbbreviation}`
  }

  return (
    <div className="cell timeline-picker-cell">
      {!dateModal ? (
        <div
          className="pill"
          style={{
            background: group.style.color ? color : '#333',
          }}
          onClick={() => {
            setDateModal(true)
          }}>
          {task['timeline' + cmpId]
            ? formatDateRange(task['timeline' + cmpId])
            : '-'}
        </div>
      ) : (
        <div className="pill">
          <RangePicker
            style={{ opacity: '0', padding: '0' }}
            onClick={() => setDateModal(true)}
            onOpenChange={() => setDateModal((a) => !a)}
            format={dateFormat}
            onChange={(ev) => handleDateChange(ev)}
            defaultValue={
              task['timeline' + cmpId] ? dayjs(task['timeline' + cmpId]) : null
            }
            open={dateModal}
            autoFocus={dateModal}
          />
          //{' '}
        </div>
      )}
    </div>
  )
}
