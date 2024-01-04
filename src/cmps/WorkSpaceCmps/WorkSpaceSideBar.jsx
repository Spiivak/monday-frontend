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
import Featured from "../../assets/icons/Featured.svg"
export function WorkSpaceSideBar() {
  const [sideBar, setOpenSideBar] = useState(true)
  const [workSpace, setOpenWorkSpace] = useState(false)

  return (
    // <section className="side-bar">
    <section
      className={`side-bar justify-center${sideBar ? "" : " side-bar-close"}`}
    >
      <button className="side-bar-btn" onClick={() => setOpenSideBar(!sideBar)}>
        <img src={sideBar ? DropdownChevronLeft : DropdownChevronRight} />
      </button>
      {sideBar && (
        <div className="side-bar-container flex">
          <div className="side-bar-link-container">
            <NavLinkBtn Route={"/"} svgPath={HomeSvg}>
              Home
            </NavLinkBtn>
            <NavLinkBtn Route={"/my-work"} svgPath={MyWeekSvg}>
              My work
            </NavLinkBtn>
          </div>
          <div className="side-bar-footer">
            <div className="side-bar-actions">
              <div className="workspace flex">
                <div
                  className="workspace-section flex"
                  onClick={() => setOpenWorkSpace(!workSpace)}
                >
                  <div className=" flex justify-center">
                    <span>Sprint 4</span>
                  </div>
                  <div className="filter-btn justify-center">
                    <img src={DropdownChevronDown} />
                  </div>
                </div>

                <div className="menu-btn flex justify-center">
                  <button>
                    <img src={MenuSvg} />
                  </button>
                </div>
              </div>

              {workSpace && <WorkSpaceContext />}
              <FilterSection />
            </div>

            <WorkSpaceList />
          </div>
        </div>
      )}
    </section>
  )
}
