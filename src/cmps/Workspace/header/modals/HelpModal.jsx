// Example NotificationModal.jsx
import React, { useEffect, useRef } from 'react';

export function HelpModal({ onClose }) {

  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isHelpButton = event.target.closest('[data-search-button="true"]');
    if (!modalRef.current || (!modalRef.current.contains(event.target) && !isHelpButton)) {
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
      {/* Add content for the Notification modal */}
      <h2>Notification Modal</h2>
      {/* ... */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}