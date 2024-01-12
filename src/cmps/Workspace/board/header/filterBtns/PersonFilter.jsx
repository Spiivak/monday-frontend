import { Dropdown } from 'antd'
import { ToolTip } from '../../../../ToolTip'
import React, { useState } from 'react'
import { PersonIcon } from '../../../../Icons'
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
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}
      overlayStyle={{ width: '372px', padding: '6px' }}
    >
      {selectedMember ? (
        <ToolTip title="Filter by person">
          <button
            style={{ height: '32px', backgroundColor: '#cce5ff' }}
            className="btn-icon medium-transparent flex align-center gap8"
          >
            <div
              className="avatar-logo flex align-center justify-center gap8"
              key={selectedMember._id}
            >
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
          </button>
        </ToolTip>
      ) : (
        <ToolTip title="Filter by person">
          <button className="btn-icon medium-transparent flex align-center gap8">
            <PersonIcon />
            Person
          </button>
        </ToolTip>
      )}
    </Dropdown>
  )
}
