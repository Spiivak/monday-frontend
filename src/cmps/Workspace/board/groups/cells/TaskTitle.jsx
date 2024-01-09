import { useSelector } from 'react-redux'
import {
  deactivateTask,
  setActiveTask,
} from '../../../../../store/actions/board.actions'
// import { EditableText } from '../../EditableText'
import { NavigationChevronRightIcon, OpenIcon } from '../../../../Icons'
import { EditableText } from '../../editableText/EditableText'

export function TaskTitle({ task, cmpId, handleUpdateTask }) {
  const activeTask = useSelector(
    (storeState) => storeState.boardModule.activeTask
  )
  function onOpenTask() {
    if (activeTask) {
      deactivateTask()
    } else {
      setActiveTask(task)
    }
  }
  return (
    <div
      className="task-title flex align-center space-between hoverable"
      data-task-details="true"
    >
      <div className="wrapper flex align-center">
        <button className="btn-icon small-transparent">
          <NavigationChevronRightIcon />
        </button>

        <EditableText
          type={'taskTitle'}
          initialText={task.title}
          onSave={(text) => handleUpdateTask('task', text, task)}
        />
      </div>
      <button className="btn-icon small-transparent" onClick={onOpenTask}>
        <OpenIcon />
      </button>
    </div>
  )
}
