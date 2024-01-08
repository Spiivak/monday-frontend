// Example NotificationModal.jsx
import React, { useEffect, useRef, useState } from 'react'
import {
  BookmarkIcon,
  CloseIcon,
  DoubleCheckIcon,
  FeedbackIcon,
  InfoIcon,
  MentionIcon,
  MenuIcon,
  NavigationChevronDownIcon,
  SettingsIcon,
  WorkIcon,
} from '../../../Icons'
import { Link, NavLink } from 'react-router-dom'
import { ContextBtn } from '../../../ContextBtn'

export function InboxModal({ onClose }) {
  const { readUpdates, setReadUpdates } = useState(false)

  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isInboxButton = event.target.closest('[data-inbox-button="true"]')
    if (
      !modalRef.current ||
      (!modalRef.current.contains(event.target) && !isInboxButton)
    ) {
      onClose()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  return (
    <>
      <div className="overlay"></div>

      <div className="inbox-modal flex" ref={modalRef}>
        <div className="inbox-aside">
          <div className="inbox-aside-header">
            <div className="inbox-aside-title">
              <h2>
                Update feed <span>(Inbox)</span>
              </h2>
            </div>

            <div className="inbox-aside-subtitle flex align-center space-between">
              <div className="subtitle-content flex align-center gap8">
                <InfoIcon />
                <span>What goes in my update feed?</span>
              </div>
              <button className="btn-txt medium-sec">See more</button>
            </div>
          </div>

          <div className="inbox-aside-footer">
            <div className="inbox-aside-footer-header flex space-between align-center">
              <h2>Filter by Board</h2>
              <button className="btn-txt medium-sec flex gap8">
                <SettingsIcon />
                Feed settings
              </button>
            </div>
            <div className="inbox-aside-footer-content">
              <div className="tab-container flex space-between">
                <button className="btn-txt medium-sec">
                  All boards in my feed{' '}
                </button>
                <div className="post-count">
                  <span>1</span>
                  <span className="menu-icon">
                    <MenuIcon />
                  </span>
                </div>
              </div>

              <div className="tab-container flex space-between">
                <button className="btn-txt medium-sec">Demo Data</button>
                <div className="post-count">
                  <span>1</span>
                  <span className="menu-icon">
                    <ContextBtn type={'row'} onDeleteRow={() => {}} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aside-main">
          <div className="inbox-aside-main-header">
            <div className="header flex space-between">
              <div className="tabs flex">
                <NavLink
                  to="workspace"
                  className="btn-txt medium-sec flex align-center gap8"
                >
                  All Updates
                </NavLink>
                <NavLink
                  to="workspace1"
                  className="btn-txt medium-sec flex align-center gap8"
                >
                  <MentionIcon />I was mentioned
                </NavLink>
                <NavLink
                  to="workspace2"
                  className="btn-txt medium-sec flex align-center gap8"
                >
                  <BookmarkIcon />
                  Bookmarked
                </NavLink>
                <NavLink
                  to="workspace4"
                  className="btn-txt medium-sec flex align-center gap8"
                >
                  <WorkIcon />
                  All account updates
                </NavLink>
              </div>
              <div className="header-actions">
                <button className="btn-txt medium-sec flex gap8 align-center">
                  <FeedbackIcon /> Send feedback
                </button>
                <button
                  onClick={onClose}
                  className="relative btn-icon small-transparent"
                  style={{ top: '-32px', right: '16px' }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="inbox-body-content">
            <div className="inbox-title-actions">
              <div className="action-holder flex space-between">
                <div className="show-btn">
                  <button className="btn-txt medium-sec flex gap8">
                    <span>Show</span>
                    Unread updates
                    <NavigationChevronDownIcon />
                  </button>
                </div>
                <div className="mark-all-btn">
                  <button
                    className="btn-txt medium-sec flex gap8"
                    disabled={!readUpdates}
                  >
                    <DoubleCheckIcon />
                    Mark all updates as read
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!readUpdates && (
            <div className="no-unread-updates flex column align-center justify-center">
              <h2>No unread updates</h2>
              <p>
                To revisit updates you've already read, change the filter at the
                top left corner of your feed.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
