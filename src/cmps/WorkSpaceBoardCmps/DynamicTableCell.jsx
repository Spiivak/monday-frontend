import { StatusPicker } from './Columns/StatusPicker'
import { MemberPicker } from './Columns/MemberPicker'
import { DescriptionPicker } from './Columns/DescriptionPicker'
import { TimeLinePicker } from './Columns/TimeLinePicker'
import { FilePicker } from './Columns/FilePicker'
import { DatePickerC } from './Columns/DatePickerC'
import { TaskTitle } from './Columns/TaskTitle'

export function DynamicTableCell({ cmp, cmpId, task, onTaskUpdate }) {
  function handleUpdateTask(cmpType, data, task) {
    onTaskUpdate(cmpType, cmpId, data, task)
  }

  switch (cmp) {
    case 'title':
      return <TaskTitle {... {task, cmpId, handleUpdateTask}} />
    case 'StatusPicker':
      return <StatusPicker {...{ task, cmpId, handleUpdateTask }} />
    case 'MemberPicker':
      return <MemberPicker {...{ task, cmpId, handleUpdateTask }} />
    case 'DatePicker':
      return <DatePickerC {...{ task, cmpId, handleUpdateTask }} />
    case 'DescriptionPicker':
      return <DescriptionPicker {...{ task, cmpId, handleUpdateTask }} />
    case 'TimeLinePicker':
      return <TimeLinePicker {...{ task, cmpId, handleUpdateTask }} />
    case 'FilePicker':
      return <FilePicker {...{ task, cmpId, handleUpdateTask }} />
  }
}
