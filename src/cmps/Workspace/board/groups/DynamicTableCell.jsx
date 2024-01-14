import { StatusPicker } from './cells/StatusPicker'
import { MemberPicker } from './cells/MemberPicker'
import { DescriptionPicker } from './cells/DescriptionPicker'
import { TimelinePicker } from './cells/TimelinePicker'
import { FilePicker } from './cells/FilePicker'
import { DatePickerC } from './cells/DatePickerC'
import { NumbersPicker } from './cells/NumbersPicker'
import { TaskTitle } from './cells/TaskTitle'
import { useSelector } from 'react-redux'

export function DynamicTableCell({
  board,
  cmp,
  cmpId,
  task,
  onTaskUpdate,
  group,
  cmpsOrder,
}) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

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
      return (
        <StatusPicker
          {...{ task, cmpId, handleUpdateTask, cmpsOrder, board, loggedInUser }}
        />
      )
    case 'MemberPicker':
      return (
        <MemberPicker
          {...{ task, cmpId, handleUpdateTask, cmpsOrder, loggedInUser }}
        />
      )
    case 'DatePicker':
      return (
        <DatePickerC
          {...{ task, cmpId, handleUpdateTask, cmpsOrder, loggedInUser }}
        />
      )
    case 'DescriptionPicker':
      return (
        <DescriptionPicker
          {...{ task, cmpId, handleUpdateTask, cmpsOrder, loggedInUser }}
        />
      )
    case 'TimelinePicker':
      return (
        <TimelinePicker
          {...{ task, cmpId, handleUpdateTask, group, cmpsOrder, loggedInUser }}
        />
      )
    case 'FilePicker':
      return <FilePicker {...{ task, cmpId, handleUpdateTask, cmpsOrder }} />
    case 'NumbersPicker':
      return (
        <NumbersPicker
          {...{
            task,
            cmpId,
            handleUpdateTask,
            cmpsOrder,
            loggedInUser,
          }}
        />
      )
    default:
      return
  }
}
