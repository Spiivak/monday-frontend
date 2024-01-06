import { useEffect, useState } from 'react'

import { FilterSection } from './modals/FilterSection'
import {
  NavigationChevronLeftIcon,
  NavigationChevronRightIcon,
} from '../Icons'
import { loadBoards } from '../../store/actions/board.actions'
import { ADD_BOARD } from '../../store/reducers/board.reducer'
import { useSelector } from 'react-redux'
import { SideBarLinks } from './SideBarLinks'
import { SideBarWorkSpace } from './SideBarWorkSpace'
import { WorkSpaceList } from './WorkSpaceList'
export function SideBar({ onRemoveBoard, onAddBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  console.log('SideBar  boards:', boards)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSideBar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    onLoadBoards()
  }, [])

  async function onLoadBoards() {
    try {
      await loadBoards()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={`side-bar relative ${!isSidebarOpen ? 'side-bar-close' : ''}`}>

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
        <SideBarLinks />

        <div className="side-bar-footer">
          <div className="title-wrapper">
            <SideBarWorkSpace />
            <FilterSection />
          </div>

          <WorkSpaceList {...{ onRemoveBoard }} />
        </div>
      </div>
    </section>
  )
}
