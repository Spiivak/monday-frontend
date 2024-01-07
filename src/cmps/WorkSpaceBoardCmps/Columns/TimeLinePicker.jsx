import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export function TimeLinePicker({ task, cmpId, handleUpdateTask }) {
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
    <div className="timeline-picker-cell">
      {task['timeline'+cmpId] ? (
        <RangePicker
          defaultValue={task['timeline'+cmpId].map((timestamp) => dayjs(timestamp))}
          format={dateFormat}
          onChange={handleDateChange}
        />
      ) : (
        <RangePicker format={dateFormat} onChange={handleDateChange} />
      )}
    </div>
  )
}
