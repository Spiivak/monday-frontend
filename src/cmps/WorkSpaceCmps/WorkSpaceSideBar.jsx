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
import { HomeIcon, MenuIcon, NavigationChevronLeftIcon, NavigationChevronRightIcon, NavigationChevronUpIcon, WorkIcon } from "../Icons"
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
        <div className="side-bar-container flex">
          {/* ASIDE HEADER LINKS */}
          <div className="side-bar-link-container flex column">
            <NavLink Route="/"><HomeIcon /> Home</NavLink>
            <NavLink Route="/my-work"><WorkIcon /> My Work</NavLink>
          </div>

          {/* ASIDE FOOTER */}
          <div className="side-bar-footer">
            <div className="side-bar-actions">
              <div className="workspace flex">


                <div className="workspace-section flex space-between btn-icon medium-transparent" onClick={() => setOpenWorkSpace(!workSpace)}>
                    <div className="workspace-header">
                      <span>Sprint 4</span>
                    </div>
                    <div className="btn-icon small-transparent">
                      <NavigationChevronUpIcon />
                  </div>
                </div>

                <div className="menu-btn flex justify-center">
                  <button className="btn-icon medium-transparent">
                    <MenuIcon />
                  </button>
                </div>
              </div>

              {workSpace && <WorkSpaceContext />}
              <FilterSection />
            </div>

            <WorkSpaceList {...{ onRemoveBoard }} />
          </div>
        </div>
      )}
    </section>
  )
}
