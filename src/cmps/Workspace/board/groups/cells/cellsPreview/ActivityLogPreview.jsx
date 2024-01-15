import { utilService } from '../../../../../../services/util.service'
import { NavigationChevronDownIcon, TimeIcon } from '../../../../../Icons'
export function ActivityLogPreview({ activeTask, activeBoard }) {
  const selectedLog = activeTask
    ? activeTask.activity || []
    : activeBoard.groups.flatMap((group) =>
        group.tasks.flatMap((task) => task.activity)
      )

  return (
    <div className="activity-log flex column align-center">
      {selectedLog.map((active) => {
        if (!active) return null

        return (
          <div style={{ alignItems: 'center' }} key={active.createdAt}>
            <span className="time-format">
              <TimeIcon />
              {utilService.timeDiff(active.createdAt)}
            </span>
            <span className="active-userimg">
              <img
                src={active.by.imgUrl}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </span>
            {/* <span className="active-fullname">{active.by.fullname}</span> */}
            <span className="active-title">{active.title}</span>
            <span className="active-colname">{active.colName}</span>
            <span
              style={{
                padding: active.oldValue ? '8px' : '',
                placeSelf: active.oldValue ? 'center' : '',
                width: active.oldValue ? '100%' : '',
                textAlign: active.oldValue ? 'center' : '',
                backgroundColor: active.oldValue ? active.oldValueColor : '',
              }}
              className="old-value"
            >
              {active.oldValue}
            </span>
            <span className="chevron">
              <NavigationChevronDownIcon />
            </span>
            <span
              style={{
                padding: active.newValue ? '8px' : '',
                placeSelf: active.newValue ? 'center' : '',
                width: active.newValue ? '100%' : '',
                textAlign: active.newValue ? 'center' : '',
                backgroundColor: active.newValue ? active.newValueColor : '',
              }}
              className="new-value"
            >
              {active.newValue}
            </span>
          </div>
        )
      })}
    </div>
  )
}
