// Example NotificationModal.jsx
import React, { useEffect, useRef } from 'react';
import { CloseSmallIcon, FeedbackIcon, MenuIcon, NavigationChevronDownIcon, PersonIcon, SearchIcon } from '../../Icons';

export function NotificationModal({ onClose }) {
  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isNotifyButton = event.target.closest('[data-notification-button="true"]');
    if (!modalRef.current || (!modalRef.current.contains(event.target) && !isNotifyButton)) {
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
    <div className="notification-modal" ref={modalRef}>
      <div className="notification-header flex space-between">
        <button className='btn-icon small-transparent' onClick={() => onClose()}>
          <CloseSmallIcon/>
          </button>
        <div className="notifications-header-btns flex align-center">
          <div className="notification-feedback">
            <button className='btn-icon medium-transparent'>
              <FeedbackIcon/>
              Give feedback</button>
          </div>
          <div className="notification-header-menu">
            <button className='btn-icon small-transparent'>
              <MenuIcon/>
              </button>
          </div>
        </div>
      </div>
      <span className='notification-header-title'>Notifications</span>

      <div className="notification-preview-header flex column">
        <div className="notificaitons-tabs quick-filters flex column">
          <div className="tabs">
            <div className="tab-container">
              <div className="tab-label">
                <span>All</span>
                <span className='underline-active'></span>
              </div>
            </div>
            <div className="tab-container">
              <div className="tab-label">
                <span>Unread</span>
                <span className='underline-active'></span>
              </div>
            </div>
            <div className="tab-container">
              <div className="tab-label">
                <span>I was mentioned</span>
                <span className='underline-active'></span>
              </div>
            </div>
            <div className="tab-container">
              <div className="tab-label">
                <span>Assigned to me</span>
                <span className='underline-active'></span>
              </div>
            </div>
          </div>
        </div>

        <div className="notification-search">
          <div className="serach-input">
            <div className="label-wrapper">
              <div className="input-wrapper">
                <input type="search" placeholder='Search all notifications'/>
                <button className='btn-icon small-transparent'>
                  <SearchIcon/>
                  </button>
              </div>
            </div>
          </div>
          <div className="notifications-person-filter">
            <button className='btn-icon large-transparent'>
              <PersonIcon/>
              <span>Filter by person</span>
              <NavigationChevronDownIcon/>
            </button>
          </div>
        </div>
      </div>
      {/* ... */}
    </div>
  );
}