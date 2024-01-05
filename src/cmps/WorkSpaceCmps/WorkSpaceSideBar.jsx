import { useState } from 'react'

import DropdownChevronLeft from '../../assets/icons/DropdownChevronLeft.svg'
import DropdownChevronRight from '../../assets/icons/DropdownChevronRight.svg'
import DropdownChevronDown from '../../assets/icons/DropdownChevronDown.svg'
import { WorkSpaceContext } from '../WorkSpaceSideBarCmps/WorkSpaceContext'
import { FilterSection } from '../WorkSpaceSideBarCmps/FilterSection'
import { WorkSpaceList } from '../WorkSpaceSideBarCmps/WorkSpaceList'
import HomeSvg from '../../assets/icons/Home.svg'
import MyWeekSvg from '../../assets/icons/MyWeek.svg'
import MenuSvg from '../../assets/icons/Menu.svg'
import {
  HomeIcon,
  MenuIcon,
  NavigationChevronDownIcon,
  NavigationChevronLeftIcon,
  NavigationChevronRightIcon,
  NavigationChevronUpIcon,
  WorkIcon,
} from '../Icons'
import { NavLink } from 'react-router-dom'
import Frame from '../../assets/img/Frame.png'
import { MoreModal } from '../WorkSpaceSideBarCmps/MoreModal'
import { addBoard } from '../../store/actions/board.actions'
export function WorkSpaceSideBar({ onRemoveBoard, onAddBoard }) {
  const [isWpModalOpen, setIsWpModalOpen] = useState(false)
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)
  const [sideBar, setOpenSideBar] = useState(true)

  const openWorkspaceModal = () => setIsWpModalOpen(!isWpModalOpen)
  const openMoreModal = () => setIsMoreModalOpen(!isMoreModalOpen)

  function onCloseModal() {
    setIsWpModalOpen(!isWpModalOpen)
    setIsMoreModalOpen(!isMoreModalOpen)
  }

  return (
    <section className={`side-bar ${sideBar ? '' : 'side-bar-close'}`}>
      <button
        className="btn-icon small-transparent close-btn"
        onClick={() => setOpenSideBar(!sideBar)}>
        {sideBar ? (
          <NavigationChevronRightIcon />
        ) : (
          <NavigationChevronLeftIcon />
        )}
      </button>
      {sideBar && (
        <div className="side-bar-container flex column">
          {/* ASIDE HEADER LINKS */}
          <div className="side-bar-link-container flex column">
            <NavLink to="/">
              <HomeIcon /> Home
            </NavLink>
            <NavLink to="/my-work">
              <WorkIcon /> My Work
            </NavLink>
          </div>

          {/* ASIDE FOOTER */}
          <div className="side-bar-footer">
            <div className="title-wrapper">
              <div className="home-workspace-items-title">
                <div className="workspace-dropdown-button flex space-between">
                  <div
                    className="dropdown-button flex space-between align-center gap8"
                    onClick={() => openWorkspaceModal()}>
                    <div className="workspace-title flex align-center space-between">
                      <div className="workspace-icon">
                        <div className="workspace-name-wrapper flex align-center gap8">
                          {/* <HomeIcon /> */}
                          <picture>
                            <img src={Frame} alt="" />
                          </picture>
                          <span>Sprint 4</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-icon-wrapper flex align-center gap8">
                      <div className="chvron-down">
                        <NavigationChevronDownIcon className="chvron-down" />
                      </div>
                    </div>
                  </div>
                  <div className="header-menu">
                    <button
                      className="btn-icon small-transparent"
                      onClick={() => openMoreModal()}>
                      <MenuIcon />
                    </button>
                    {isMoreModalOpen && <MoreModal />}
                  </div>
                </div>
              </div>

              <FilterSection onAddBoard={onAddBoard} />
              {isWpModalOpen && <WorkSpaceContext />}
            </div>

            <WorkSpaceList {...{ onRemoveBoard }} />
          </div>
        </div>
      )}
    </section>
  )
}
