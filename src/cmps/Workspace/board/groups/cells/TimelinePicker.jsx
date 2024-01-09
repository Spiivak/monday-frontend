import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { TimelinePreview } from './cellsPreview/TimelinePreview'

export function TimelinePicker({ task, cmpId, handleUpdateTask, group }) {
  const [dateModal, setDateModal] = useState(false)
  const [color, setColor] = useState('#333')
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    if (group?.style?.color) {
      const today = Date.now()
      if (!task['timeline' + cmpId] || task['timeline' + cmpId].length === 0)
        return
      const fromDate = task['timeline' + cmpId][0]
      const toDate = task['timeline' + cmpId][1]
      let percentile
      if (today <= fromDate) setColor('#333')
      else if (today > fromDate && today < toDate) {
        percentile = Math.floor(
          100 - ((today - fromDate) / (toDate - fromDate)) * 100
        )
        setColor(
          `linear-gradient(to left, #333 ${percentile}%, ${group.style.color} ${percentile}%)`
        )
      } else setColor(group.style.color)
    }
  }, [task['timeline' + cmpId]])

  async function handleDateChange(dates) {
    if (dates) {
      try {
        const [startDate, endDate] = dates
        const timestampStartDate = startDate.valueOf()
        const timestampEndDate = endDate.valueOf()
        await handleUpdateTask(
          'TimelinePicker',
          [timestampStartDate, timestampEndDate],
          task
        )
      } catch (err) {
        console.error('Cannot set dates', err)
      } finally {
        setDateModal(false)
      }
    }
  }

  async function removeDates(ev) {
    try {
      ev.stopPropagation()
      await handleUpdateTask('TimelinePicker', null, task)
      setColor('#333')
    } catch (err) {
      console.error('Cannot clear dates', err)
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
        <TimelinePreview
          {...{
            setDateModal,
            formatDateRange,
            removeDates,
            task,
            cmpId,
            group,
            color,
          }}
        />
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
