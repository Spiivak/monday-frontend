import { NavLink } from 'react-router-dom'
import { AddSmallIcon, HomeIcon, NavigationChevronUpIcon } from '../../../Icons'

export function BoardTabs({ }) {
  return (
    <section className="board-tabs flex space-between">
      <div className="tabs flex">
        <NavLink to="/workspace">
            <button className="btn-icon medium-transparent flex gap8">
              <HomeIcon />
              Main Table
            </button>
        </NavLink>
        <button className="btn-icon medium-transparent flex align-center add-view-btn">
          <AddSmallIcon />
        </button>
      </div>
      <div className="expend-collapse flex align-center">
        <button className="btn-icon medium-transparent">
          <NavigationChevronUpIcon />
        </button>
      </div>
    </section>
  )
}
