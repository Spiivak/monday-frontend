// Example NotificationModal.jsx
import React from 'react';
import Close from '../../../assets/icons/Close.svg'
import Feedback from '../../../assets/icons/Feedback.svg'
import Menu from '../../../assets/icons/Menu.svg'
import Search from '../../../assets/icons/Search.svg'
import PersonRound from '../../../assets/icons/Person.svg'
import DropdownChevronDown from '../../../assets/icons/DropdownChevronDown.svg'

export function NotificationModal({ onClose }) {
  return (
    <div className="notification-modal">
      <div className="notification-header flex space-between">
        <button className='btn-icon small-transparent' onClick={() => onClose()}><img src={Close} alt="" /></button>
        <div className="notifications-header-btns flex align-center">
          <div className="notification-feedback">
            <button className='btn-icon medium-transparent'><img src={Feedback} alt="" />Give feedback</button>
          </div>
          <div className="notification-header-menu">
            <button className='btn-icon small-transparent'><img src={Menu} alt="" /></button>
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
                <button className='btn-icon small-transparent'><img src={Search} alt="" /></button>
              </div>
            </div>
          </div>
          <div className="notifications-person-filter">
            <button className='btn-icon large-transparent'>
              <img src={PersonRound} alt="" />
              <span>Filter by person</span>
              <img src={DropdownChevronDown} alt="" />
            </button>
          </div>
        </div>
      </div>
      {/* ... */}
    </div>
  );
}