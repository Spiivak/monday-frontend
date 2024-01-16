import { NavLink, useParams } from 'react-router-dom'
import { HomeIcon, NavigationChevronUpIcon } from '../../../Icons'

export function BoardTabs({ isCollapsed, onCollapse, board }) {
  const { boardId } = useParams()
  return (
    <section className={`board-tabs flex space-between`}>
      <div className="tabs flex">
        <NavLink end to={`/workspace/${boardId}`}>
          <button className="btn-icon medium-transparent flex gap8">
            <HomeIcon />
            Main Table
          </button>
        </NavLink>
        <div className='divider'></div>
        <NavLink to={`/workspace/${boardId}/views`}>
          <button className="btn-icon medium-transparent flex gap8">
            Kanban
          </button>
        </NavLink>
      </div>
      {!isCollapsed && (
        <div className="expend-collapse flex align-center">
          <button className="btn-icon medium-transparent" onClick={onCollapse}>
            <NavigationChevronUpIcon />
          </button>
        </div>
      )}
    </section>
  )
}
