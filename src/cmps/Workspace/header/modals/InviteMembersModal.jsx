// Example NotificationModal.jsx
import React from 'react'

export function InviteMembersModal({ onClose }) {
  return (
    <div className="notification-modal" style={{ backgroundColor: 'red' }}>
      {/* Add content for the Notification modal */}
      <h2>Notification Modal</h2>
      {/* ... */}
      <button onClick={onClose}>Close</button>
    </div>
  )
}
