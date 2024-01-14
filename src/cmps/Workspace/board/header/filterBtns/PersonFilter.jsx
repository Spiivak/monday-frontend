import React, { useEffect, useRef, useState } from 'react';
import { ToolTip } from '../../../../ToolTip';
import { CloseIcon, PersonIcon } from '../../../../Icons';

export function PersonFilter({ filterBy, handleChange, handleSubmit, board }) {
  const members = board?.members;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  function handleOpenModal(event) {
    event.stopPropagation();

    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible)
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleMemberSelect(member) {
    setSelectedMember(member);
    const filterBy = { person: member };
    handleSubmit(filterBy);
    handleCloseModal();
  }

  const PersonFilterModal = ({ members, onSelect, onClose }) => {
    
    const modalRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose()
        }
      }
  
      window.addEventListener('click', handleClickOutside);
  
      return () => {
        window.removeEventListener('click', handleClickOutside);
      }
    }, [onClose]);
  
    return (

      <div className="person-filter-modal" ref={modalRef}>
          <h3 className='title'>Quick person filter</h3>
          <span className='subtitle'>Filter items and subitems by person</span>
        <div className="modal-content flex">
          {members.map((member) => (
            <div
              key={member._id}
              className="modal-item"
              onClick={() => onSelect(member)}
              >
              <img
                src={member.imgUrl}
                alt={member.fullname}
                style={{
                  width: '30px',
                  height: '30px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
  }
  
  const buttonStyle = selectedMember
  ? {
      backgroundColor: '#CCE5FF',
      // Add any other styles as needed
    }
  : {}
    return (
    <>
      <ToolTip title="Filter by person">
        <button
          className="btn-icon medium-transparent flex align-center gap8"
          onClick={handleOpenModal}
          style={buttonStyle}
        >
          {selectedMember ? (
            <div className="avatar-logo flex align-center justify-center gap8">
              <img
                src={selectedMember.imgUrl}
                alt=""
                style={{
                  height: '16px',
                  width: '16px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              Person
              <button
                className="flex align-center justify-center"
                style={{
                  width: '16px',
                  height: '16px',
                  scale: '0.6',
                  border: 'none',
                  backgroundColor: 'darkgray',
                  borderRadius: '50%',
                  color: 'white',
                }}
                onClick={() => handleMemberSelect(null)}
              >
                x
              </button>
            </div>
          ) : (
            <>
              <PersonIcon />
              Person
            </>
          )}
        </button>
      </ToolTip>

      {isModalVisible && (
        <PersonFilterModal
          members={members}
          onSelect={handleMemberSelect}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
