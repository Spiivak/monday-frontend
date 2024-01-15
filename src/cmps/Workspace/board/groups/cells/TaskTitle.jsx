import { useSelector } from 'react-redux'
import {
  deactivateTask,
  setActiveTask,
} from '../../../../../store/actions/board.actions'
import { OpenIcon } from '../../../../Icons'
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
    <div className="task-title flex align-center" data-task-details="true">
      <EditableText
        type={'taskTitle'}
        initialText={task.title}
        onSave={(text) => handleUpdateTask('task', text, task)}
      />
      <button className="btn-icon small-transparent" onClick={onOpenTask}>
        <OpenIcon />
        Open
      </button>
    </div>
  )
}
