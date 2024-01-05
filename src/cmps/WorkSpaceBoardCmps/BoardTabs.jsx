import { NavLink } from 'react-router-dom'
import { AddSmallIcon, HomeIcon, NavigationChevronUpIcon } from '../Icons'

export function BoardTabs({}) {
  return (
    <section className="board-tabs">
      <div className="tabs">
        <NavLink>
        <button className="btn-icon medium-transparent flex gap8">
          <HomeIcon />
          Main Table
        </button>
        </NavLink>
        <button className="btn-icon medium-transparent">
          <AddSmallIcon />
        </button>
      </div>
      <div className="expend-collapse">
        <button className="btn-icon medium-transparent">
          <NavigationChevronUpIcon />
        </button>
      </div>
    </section>
  )
}
