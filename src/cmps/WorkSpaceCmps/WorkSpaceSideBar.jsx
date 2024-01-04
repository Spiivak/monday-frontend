import { useState } from "react"

import DropdownChevronLeft from "../../assets/icons/DropdownChevronLeft.svg"
import DropdownChevronRight from "../../assets/icons/DropdownChevronRight.svg"
import DropdownChevronDown from "../../assets/icons/DropdownChevronDown.svg"
import { WorkSpaceContext } from "../WorkSpaceSideBarCmps/WorkSpaceContext"
import { NavLinkBtn } from "../WorkSpaceSideBarCmps/NavLinkBtn"
import { FilterSection } from "../WorkSpaceSideBarCmps/FilterSection"
import { WorkSpaceList } from "../WorkSpaceSideBarCmps/WorkSpaceList"
import HomeSvg from "../../assets/icons/Home.svg"
import MyWeekSvg from "../../assets/icons/MyWeek.svg"
import MenuSvg from "../../assets/icons/Menu.svg"
import { HomeIcon, MenuIcon, NavigationChevronDownIcon, NavigationChevronLeftIcon, NavigationChevronRightIcon, NavigationChevronUpIcon, WorkIcon } from "../Icons"
import { NavLink } from "react-router-dom"
export function WorkSpaceSideBar({ onRemoveBoard }) {
  const [sideBar, setOpenSideBar] = useState(true)
  const [workSpace, setOpenWorkSpace] = useState(false)

  return (
    <section className={`side-bar ${sideBar ? "" : "side-bar-close"}`}>
      <button className="btn-icon small-transparent close-btn" onClick={() => setOpenSideBar(!sideBar)}>
        {sideBar ? <NavigationChevronRightIcon /> : <NavigationChevronLeftIcon />}
      </button>
      {sideBar && (
        <div className="side-bar-container flex column">
          {/* ASIDE HEADER LINKS */}
          <div className="side-bar-link-container flex column">
            <NavLink Route="/"><HomeIcon /> Home</NavLink>
            <NavLink Route="/my-work"><WorkIcon /> My Work</NavLink>
          </div>

          {/* ASIDE FOOTER */}
          <div className="side-bar-footer">



            <div className="title-wrapper">
              <div className="home-workspace-items-title">

                <div className="workspace-dropdown-button flex space-between">
                  <div className="workspace-title flex align-center space-between">
                    <div className="workspace-icon">
                      <HomeIcon />
                    </div>
                    <div className="workspace-name-wrapper">
                      <span>Sprint 4</span>
                    </div>
                  </div>
                  <div className="dropdown-icon-wrapper flex align-center gap8">
                    <div className="chvron-down">

                    <NavigationChevronDownIcon className="chvron-down" />
                    </div>
                    <div className="header-menu">
                      <button className="btn-icon small-transparent"><MenuIcon /></button>
                    </div>
                  </div>
                </div>
              </div>

              <FilterSection />
              {workSpace && <WorkSpaceContext />}
            </div>

            <WorkSpaceList {...{ onRemoveBoard }} />
          </div>
        </div>
      )}
    </section>
  )
}
