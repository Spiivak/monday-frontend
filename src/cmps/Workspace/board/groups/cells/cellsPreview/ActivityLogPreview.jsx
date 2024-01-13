import { useSelector } from 'react-redux'
import { utilService } from '../../../../../../services/util.service'
import {
  NavigationChevronDownIcon,
  PersonRoundedIcon,
  TimeIcon,
} from '../../../../../Icons'
export function ActivityLogPreview() {
  const selectedTask = useSelector(
    (storeState) => storeState.boardModule.activeTask
  )

  return (
    <div className="activity-log flex column">
      {selectedTask.activity?.map((active) => (
        <div key={active.createdAt}>
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
          <span className="old-value">{active.oldValue}</span>
          <span className="chevron">
            <NavigationChevronDownIcon />
          </span>
          <span className="new-value">{active.newValue}</span>
        </div>
      ))}
    </div>
  )
}
