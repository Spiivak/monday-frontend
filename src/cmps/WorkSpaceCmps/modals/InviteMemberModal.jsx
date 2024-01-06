import { useEffect, useRef, useState } from 'react';
import { CloseIcon } from '../../Icons';

export function InviteMemberModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');

  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isInviteButton = event.target.closest('[data-invite-button="true"]');
    if (!modalRef.current || (!modalRef.current.contains(event.target) && !isInviteButton)) {
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


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleInvite = () => {
    // Add logic to handle the invite here
    console.log(`Inviting ${email} as a ${role}`);
    // Close the modal or perform other actions as needed
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="invite-member-modal">
        <button onClick={onClose} className='absolute btn-icon small-transparent' style={{ top: '-25px', left: '525px' }}><CloseIcon /></button>
        <div className="header">
          <h2>Invite to Monday</h2>
        </div>

        <div className="body flex column">
          <div className="invite">
            <label htmlFor="invite">Invite with email</label>
            <input
              type="email"
              name="invite"
              placeholder="Enter one or more email addresses"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="select flex gap16">
            <div className="option flex gap8">
              <input
                type="radio"
                name="role"
                value="member"
                checked={role === 'member'}
                onChange={handleRoleChange}
              />
              <label htmlFor="member">Member</label>
            </div>
            <div className="option flex gap8">
              <input
                type="radio"
                name="role"
                value="viewer"
                checked={role === 'viewer'}
                onChange={handleRoleChange}
              />
              <label htmlFor="viewer">Viewer (Read Only)</label>
            </div>
          </div>

          <div className="buttons flex">
            <button onClick={handleInvite} className='btn-ctn medium-primary'>Invite</button>
          </div>
        </div>
      </div>
    </>
  );
}
