import { useSelector } from 'react-redux'
import { utilService } from '../../../../../../services/util.service'
import { NavigationChevronDownIcon, PersonRoundedIcon, TimeIcon } from '../../../../../Icons'
import Frame from '../../../../../../assets/img/Frame.png'
export function ActivityLogPreview() {
  const selectedTask = useSelector((storeState) => storeState.boardModule.activeTask)

  return (
    <div className='activity-log flex column'>
      {selectedTask.activity?.map((active) => (
        <div className="flex" key={active.createdAt}>
          <span className='time-format'>
            <TimeIcon />
            {utilService.timeDiff(active.createdAt)}
          </span>
          <span className='active-userimg'><PersonRoundedIcon/></span>
          <span className='active-title'>{active.title}</span>
          <span className='active-colname'>{active.colName}</span>
          <span className='old-value'>{active.oldValue}</span>
          <span className='chevron'><NavigationChevronDownIcon/></span>
          <span className='new-value'>{active.newValue}</span>
        </div>
      ))}
    </div>
  )
}
