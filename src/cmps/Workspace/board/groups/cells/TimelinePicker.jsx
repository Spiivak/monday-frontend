import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { TimelinePreview } from './cellsPreview/TimelinePreview'
import { utilService } from '../../../../../services/util.service'

export function TimelinePicker({
  task,
  cmpId,
  handleUpdateTask,
  group,
  cmpsOrder,
}) {
  const [dateModal, setDateModal] = useState(false)
  const [color, setColor] = useState('#333')
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY/MM/DD'
  const colName = cmpsOrder.find((cmp) => cmp.type === 'TimelinePicker')?.title

  const oldValue = task['timeline' + cmpId]

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
        const updatedTask = {
          ...task,
          ['timeline' + cmpId]: [timestampStartDate, timestampEndDate],
        }
        await handleUpdateTask(
          'TimelinePicker',
          [timestampStartDate, timestampEndDate],
          updatedTask
        )
        await handleUpdateTask(
          'Activity',
          {
            createdAt: Date.now(),
            title: updatedTask.title,
            colName,
            oldValue: utilService.formatDateRange(oldValue),
            newValue: utilService.formatDateRange([
              timestampStartDate,
              timestampEndDate,
            ]),
          },
          updatedTask
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
      const updatedTask = { ...task, ['timeline' + cmpId]: null }

      await handleUpdateTask('TimelinePicker', null, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: utilService.formatDateRange(oldValue),
          newValue: '-',
        },
        updatedTask
      )
      setColor('#333')
    } catch (err) {
      console.error('Cannot clear dates', err)
    }
  }

  return (
    <div className="cell timeline-picker-cell">
      {!dateModal ? (
        <TimelinePreview
          {...{
            setDateModal,
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
