import { Button, Dropdown, Input, Tooltip } from 'antd'
import React, { useState, useEffect } from 'react'
import { CloseSmallIcon, PersonIcon } from '../../../../Icons'
import { useSelector } from 'react-redux'
export function PersonFilter({ filterBy, handleChange, handleSubmit, board }) {
  const members = board?.members
  const [selectedMember, setSelectedMember] = useState(null)
  let items
  if (members) {
    items = [
      ...members?.map((member) => {
        return {
          key: member._id,
          label: (
            <div key={member._id} onClick={() => handleMemberSelect(member)}>
              <div className="flex align-center  gap8">
                <img
                  src={member.imgUrl}
                  alt={member.fullname}
                  style={{
                    width: '15px',
                    height: '15px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
                <h5>{member.fullname}</h5>
              </div>
            </div>
          ),
        }
      }),
    ]
  }
  function handleMemberSelect(member) {
    setSelectedMember(member)
    const filterBy = { person: member }
    handleSubmit(filterBy)
  }

  if (!items) return
  return (
    <Tooltip title="Filter by person" placement="top" arrow>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottom"
        arrow={{
          pointAtCenter: true,
        }}
        overlayStyle={{ width: '372px', padding: '6px' }}>
        {selectedMember ? (
          <button
            style={{ height: '28px', backgroundColor: 'blue' }}
            className="btn-icon medium-transparent flex align-center gap8">
            <div
              className="avatar-logo flex align-center justify-center gap8"
              key={selectedMember._id}>
              <img
                src={selectedMember.imgUrl}
                alt=""
                style={{
                  height: '20px',
                  width: '20px',
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
                onClick={() => handleMemberSelect(null)}>
                x
              </button>
            </div>
          </button>
        ) : (
          <button
            style={{ height: '28px' }}
            className="btn-icon medium-transparent flex align-center gap8">
            <PersonIcon />
            Person
          </button>
        )}
      </Dropdown>
    </Tooltip>
  )
}
