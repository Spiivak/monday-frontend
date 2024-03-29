import { useState } from 'react'

import { SidebarFilter } from './SidebarFilter'
import {
  NavigationChevronLeftIcon,
  NavigationChevronRightIcon,
} from '../../Icons'
import { useSelector } from 'react-redux'
import { SidebarLinks } from './SidebarLinks'
import { SidebarWorkspace } from './SidebarWorkspace'
import { SidebarBoardList } from './SidebarBoardList'

export function Sidebar({ onRemoveBoard, onAddBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const openSideBar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <section className={`side-bar ${isSidebarOpen ? '' : 'side-bar-close'}`}>
      <button
        className="btn-icon small-transparent close-btn flex justify-center"
        onClick={() => openSideBar()}
      >
        {isSidebarOpen ? (
          <NavigationChevronLeftIcon />
        ) : (
          <NavigationChevronRightIcon />
        )}
      </button>

      <div className="side-bar-container flex column">
        <SidebarLinks />

        <div className="side-bar-footer">
          <div className="title-wrapper">
            <SidebarWorkspace />
            <SidebarFilter {...{ onAddBoard }} />
          </div>

          <SidebarBoardList {...{ onRemoveBoard }} />
        </div>
      </div>
    </section>
  )
}
