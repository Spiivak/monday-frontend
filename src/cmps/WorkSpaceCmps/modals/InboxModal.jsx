// Example NotificationModal.jsx
import React from 'react';

export function InboxModal({ onClose }) {
  return (
    <div className="inbox-modal">
      <button onClick={onClose}>Close</button>

      <div className="inbox-aside">
        <div className="inbox-aside-header">

          <div className="inbox-aside-title">
            <h2>Update feed (Inbox)</h2>
          </div>

          <div className="inbox-aside-subtitle">
            <img src="" alt="" />
            <span>What goes in my update feed?</span>
            <button className='btn-text medium-primary'>See more</button>
          </div>

        </div>
        <div className="inbox-aside-footer">
          <div className="inbox-aside-footer-header flex space-between">
            <h2>Filter by Board</h2>
            <button><img src="" alt="" /> Feed settings</button>
          </div>
          <div className="inbox-aside-footer-content">
            <div className="tab-container flex space-between">
            <button>All boards in my feed</button>
            <div className="post-count">
              <span>1</span>
            </div>
            </div>
            <div className="tab-container flex space-between">
            <button>Demo Data</button>
            <div className="post-count">
              <span>1</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}