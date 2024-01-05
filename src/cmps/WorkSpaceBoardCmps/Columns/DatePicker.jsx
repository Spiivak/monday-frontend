import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export function DatePicker({ task, handleUpdateTask }) {
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
