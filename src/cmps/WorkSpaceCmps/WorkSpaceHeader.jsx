import { LogoBtn } from '../WorkSpaceHeaderCmps/LogoBtn'
import { useState } from 'react'

// MODALS
import { NotificationModal } from './modals/NotificationModal'
import { HelpModal } from './modals/HelpModal'
import { InboxModal } from './modals/InboxModal'
import {
  HelpIcon,
  InboxIcon,
  InviteMembersIcon,
  MondayIcon,
  MwmIcon,
  NotificationsIcon,
  SearchIcon,
  SwitcherIcon,
} from '../Icons'
import { InviteMemberModal } from './modals/InviteMemberModal'
import { SearchEverythingModal } from './modals/SearchEverythingModal'
import UserProfile from '../../assets/img/user-profile.png'
import { TaskDetails } from '../WorkSpaceBoardCmps/TaskDetails'

export function WorkSpaceHeader() {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false)
  const [isInboxModalOpen, setInboxModalOpen] = useState(false)
  const [isInviteMembersModalOpen, setInviteMembersModalOpen] = useState(false)
  const [isSearchModalOpen, setSearchModalOpen] = useState(false)
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)

  function onClickNotifyModal() {
    setNotificationModalOpen((prev) => !prev)
  }

  function onClickInboxModal() {
    setInboxModalOpen((prev) => !prev)
  }

  function onClickInviteModal() {
    setInviteMembersModalOpen((prev) => !prev)
  }

  function onClickSearchModal() {
    setSearchModalOpen((prev) => !prev)
  }

  function onClickHelpModal() {
    setHelpModalOpen((prev) => !prev)
  }

  const onClose = () => {
    setNotificationModalOpen(false)
    setInboxModalOpen(false)
    setInviteMembersModalOpen(false)
    setSearchModalOpen(false)
    setHelpModalOpen(false)
  }


  return (
    <>
    <header className="work-space-header full flex space-between align-center">
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
          onClick={onClickNotifyModal}
        >
          <div className="flex align-center" data-notification-button="true">
          <NotificationsIcon />
          </div>
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={onClickInboxModal}
        > 
        <div className="flex align-center" data-inbox-button="true">
          <InboxIcon />
        </div>
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={onClickInviteModal}
        >
          <div className="flex align-center" data-invite-button="true">
          <InviteMembersIcon />
          </div>
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={onClickSearchModal}
        >
          <div className="flex align-center" data-search-button="true">
          <SearchIcon />
          </div>
        </button>
        <button
          className="btn-icon large-transparent"
          onClick={onClickHelpModal}
        >
          <div className="flex align-center" data-help-button="true">
          <HelpIcon />
          </div>
        </button>
        <button className='btn-icon small-transparent flex gap8'>
          <MondayIcon />
          <img src={UserProfile} alt="" style={{ maxWidth: "32px", borderRadius:'50px'}}/>
        </button>

        {/* Render modals */}
      </section>
    </header>
        {isInboxModalOpen && <InboxModal onClose={onClose} />}
        {isInviteMembersModalOpen && <InviteMemberModal onClose={onClose} />}
        {isSearchModalOpen && <SearchEverythingModal onClose={onClose} />}
        {isHelpModalOpen && <HelpModal onClose={onClose} />}
        {isNotificationModalOpen && <NotificationModal onClose={onClose} />}
        </>
  
  )
}
