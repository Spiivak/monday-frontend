import { useSelector } from 'react-redux'
import { utilService } from '../../../../../../services/util.service'
import { TimeIcon } from '../../../../../Icons'

export function ActivityLogPreview() {
  const selectedTask = useSelector(
    (storeState) => storeState.boardModule.activeTask
  )

  return (
    <div>
      {selectedTask.activity?.map((active) => (
        <div className="flex gap8" key={active.createdAt}>
          <span>
            <TimeIcon />
            {utilService.timeDiff(active.createdAt)}
          </span>
          <div>{active.title}</div>
          <div>{active.colName}</div>
          <div>{active.oldValue}</div>
          <span>&gt;</span>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {active.newValue}
          </div>
        </div>
      ))}
    </div>
  )
}
