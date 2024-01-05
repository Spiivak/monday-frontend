import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export function DatePickerC({ task, cmpId, handleUpdateTask }) {
  const dateFormat = 'YYYY/MM/DD'

  function handleUpdateDate(date) {
    if (date) {
      const timestampDate = date.valueOf()
      handleUpdateTask('DatePicker', timestampDate, task)
    }
  }
  return (
    <div className="cell">
      {task['date'+cmpId] ? (
        <DatePicker
          defaultValue={dayjs(task['date'+cmpId])}
          format={dateFormat}
          onChange={handleUpdateDate}
        />
      ) : (
        <DatePicker format={dateFormat} onChange={handleUpdateDate} />
      )}
    </div>
  )
}
