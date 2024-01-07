import React, { useState } from 'react'
import { MenuIcon, NavigationChevronDownIcon, TestIcon } from '../Icons'
import { MoreModal } from './modals/MoreModal'
import Frame from '../../assets/img/Frame.png'
import { WorkSpaceContext } from './modals/WorkSpaceContext'

export function SideBarWorkSpace() {
  const [isMenuModalOpen, setIsMenuModanOpen] = useState(false)
  const [isWpModalOpen, setIsWpModalOpen] = useState(false)

  function onClose() {
    setIsWpModalOpen(false)
    setIsMenuModanOpen(false)
  }
  const openWorkspaceModal = () => setIsWpModalOpen(!isWpModalOpen)
  const openMenuModal = () => setIsMenuModanOpen(!isMenuModalOpen)

  return (
    <div className="home-workspace-items-title">
      <div className="workspace-dropdown-button flex space-between">
        <div
          className="dropdown-button flex space-between align-center gap8"
          onClick={() => openWorkspaceModal()}
          data-workspace-button="true"
        >
          <div className="workspace-title flex align-center space-between">
              <div className="workspace-name-wrapper flex align-center">
                {/* <HomeIcon /> */}
                <picture className="flex">
                  <img src={Frame} alt="" />
                </picture>
                <span>Sprint 4</span>
              </div>
          </div>
          <div className="dropdown-icon-wrapper flex align-center gap8">
            <div className="chvron-down flex">
              <TestIcon />
            </div>
          </div>
        </div>
        <div className="header-menu flex">
          <button
            className="btn-icon medium-transparent"
            onClick={() => openMenuModal()}
          > 
          <div className='flex' data-more-button="true">
            <MenuIcon />
          </div>
          </button>
          {isMenuModalOpen && <MoreModal onClose={onClose} />}
          {isWpModalOpen && <WorkSpaceContext onClose={onClose}/>}
        </div>
      </div>
    </div>
  )
}
