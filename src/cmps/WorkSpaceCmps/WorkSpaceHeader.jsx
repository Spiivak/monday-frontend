import { LogoBtn } from '../WorkSpaceHeaderCmps/LogoBtn'
import { useState } from 'react'

// MODALS
import { NotificationModal } from './modals/NotificationModal'
import { InviteMembersModal } from './modals/InviteMembersModal'
import { SearchModal } from './modals/SearchModal'
import { HelpModal } from './modals/HelpModal'
import { ProfileModal } from './modals/ProfileModal'
import { PlansModal } from './modals/PlansModal'
import { InboxModal } from './modals/InboxModal'
import {
  HelpIcon,
  InboxIcon,
  InviteMembersIcon,
  MwmIcon,
  NotificationsIcon,
  SearchIcon,
  SwitcherIcon,
} from '../Icons'
import { InviteMemberModal } from './modals/InviteMemberModal'
import { SearchEverythingModal } from './modals/SearchEverythingModal'
// import { ActiviyIcon } from '../Icons'

export function WorkSpaceHeader() {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false)
  const [isInboxModalOpen, setInboxModalOpen] = useState(false)
  const [isInviteMembersModalOpen, setInviteMembersModalOpen] = useState(false)
  const [isSearchModalOpen, setSearchModalOpen] = useState(false)
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)

  const openNotificationModal = () => setNotificationModalOpen(true)
  const openInboxModal = () => setInboxModalOpen(true)
  const openInviteMembersModal = () => setInviteMembersModalOpen(true)
  const openSearchModal = () => setSearchModalOpen(true)
  const openHelpModal = () => setInviteMembersModalOpen(true)

  const closeAllModals = () => {
    console.log('close all')
    setNotificationModalOpen(false)
    setInboxModalOpen(false)
    setInviteMembersModalOpen(false)
    setSearchModalOpen(false)
    setHelpModalOpen(false)
  }

  return (
    <header className="work-space-header flex space-between align-center">
      <section className="header-logo-sect flex align-center">
        <div className="switcher-logo">
          <button className="btn-icon medium-transparent">
            <SwitcherIcon />
          </button>
        </div>
        <div className="work-management-logo flex align-center">
            <MwmIcon />
        </div>
        <h1 className="logo-title">
          monday <span className="logo-title-span">work management</span>
        </h1>
        <LogoBtn>See plans</LogoBtn>
      </section>

      <section className="header-action-btns-sect">
        <button
          className="btn-icon large-transparent"
          onClick={() => openNotificationModal()}
        >
          <NotificationsIcon />
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={() => openInboxModal()}
        >
          <InboxIcon />
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={() => openInviteMembersModal()}
        >
          <InviteMembersIcon />
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={() => openSearchModal()}
        >
          <SearchIcon />
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={() => openHelpModal()}
        >
          <HelpIcon />
        </button>
        <button>
          <img src="" alt="" />
          Avatar
        </button>

        {/* Render modals */}
        {isNotificationModalOpen && <NotificationModal onClose={closeAllModals} />}
        {isInboxModalOpen && <InboxModal onClose={closeAllModals} />}
        {isInviteMembersModalOpen && <InviteMemberModal onClose={closeAllModals} />}
        {isSearchModalOpen && <SearchEverythingModal onClose={closeAllModals} />}
        {isHelpModalOpen && <HelpModal onClose={closeAllModals} />}
      </section>
    </header>
  )
}
