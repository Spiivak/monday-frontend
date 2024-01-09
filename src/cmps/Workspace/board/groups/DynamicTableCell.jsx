import { StatusPicker } from './cells/StatusPicker'
import { MemberPicker } from './cells/MemberPicker'
import { DescriptionPicker } from './cells/DescriptionPicker'
import { TimelinePicker } from './cells/TimelinePicker'
import { FilePicker } from './cells/FilePicker'
import { DatePickerC } from './cells/DatePickerC'
import { NumbersPickers } from './cells/NumbersPicker'
import { TaskTitle } from './cells/TaskTitle'

export function DynamicTableCell({
  cmp,
  cmpId,
  task,
  onTaskUpdate,
  group,
  cmpsOrder,
}) {
  async function handleUpdateTask(cmpType, data, task) {
    try {
      await onTaskUpdate(cmpType, cmpId, data, task)
    } catch (err) {
      console.error(err)
    }
  }

  switch (cmp) {
    case 'title':
      return <TaskTitle {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'StatusPicker':
      return <StatusPicker {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'MemberPicker':
      return <MemberPicker {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'DatePicker':
      return <DatePickerC {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'DescriptionPicker':
      return (
        <DescriptionPicker {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
      )
    case 'TimelinePicker':
      return (
        <TimelinePicker
          {...{ task, cmpId, handleUpdateTask, group, cmpsOrder }}
        />
      )
    case 'FilePicker':
      return <FilePicker {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'NumbersPicker':
      return (
        <NumbersPickers {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
      )
  }
}
