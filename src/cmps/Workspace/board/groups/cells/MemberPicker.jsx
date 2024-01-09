import { Dropdown } from 'antd'
import Input from '@mui/joy/Input'
import { useSelector } from 'react-redux'
import { CloseSmallIcon, PersonRoundedIcon } from '../../../../Icons'
import { MemberHoverModal } from './modals/MemberHoverModal'
import { Tooltip, styled, tooltipClasses } from '@mui/material'

export function MemberPicker({ task, cmpId, handleUpdateTask, cmpsOrder }) {
  const users = useSelector((storeState) => storeState.userModule.users)
  const colName = cmpsOrder.find((cmp) => cmp.type === 'MemberPicker')?.title

  async function handleUpdateUser(selectedUser) {
    const members = updateMembers(task['members' + cmpId], selectedUser)
    const updatedTask = { ...task, ['members' + cmpId]: members.updatedMembers }

    try {
      await handleUpdateTask(
        'MemberPicker',
        members.updatedMembers,
        updatedTask
      )
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: members.action,
          newValue: selectedUser.fullname,
        },
        updatedTask
      )
    } catch (err) {
      console.error(err)
    }
  }

  function updateMembers(existingMembers, data) {
    const userExists = existingMembers.some((member) => member._id === data._id)

    if (userExists) {
      return {
        updatedMembers: existingMembers.filter(
          (member) => member._id !== data._id
        ),
        action: 'Removed',
      }
    } else {
      return { updatedMembers: [...existingMembers, data], action: 'Added' }
    }
  }

  const suggestedUsers = users.filter(
    (user) =>
      !task['members' + cmpId] ||
      !task['members' + cmpId].some((member) => member._id === user._id)
  )

  const currentUsers = users.filter((user) =>
    task['members' + cmpId]?.some((member) => member._id === user._id)
  )

  const items = [
    {
      key: '1',
      label: (
        <Input
          placeholder="Search names, roles or teams"
          size="sm"
          type="text"
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    ...currentUsers.map((user) => ({
      key: `current-${user._id}`,
      label: (
        <div key={user._id}>
          <div className="flex align-center  gap8">
            <img
              src={user.imgUrl}
              alt={user.fullname}
              style={{
                width: '15px',
                height: '15px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <h5>{user.fullname}</h5>
            <button
              className="btn-icon small-transparent"
              onClick={() => handleUpdateUser(user)}
            >
              <CloseSmallIcon />
            </button>
          </div>
        </div>
      ),
    })),
    {
      key: '3',
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <h5>Suggested people</h5>
        </div>
      ),
    },
    ...suggestedUsers.map((user) => ({
      key: `suggested-${user._id}`,
      label: (
        <div className="flex gap8 column" key={user._id}>
          <div
            onClick={() => handleUpdateUser(user)}
            className="flex align-center gap8"
          >
            <img
              src={user.imgUrl}
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <h5>{user.fullname}</h5>
          </div>
        </div>
      ),
    })),
  ]

  function renderAvatars() {
    const memberAvatars = task['members' + cmpId]?.slice(0, 1) || []
    return memberAvatars.map((member) => (
      <div className="avatar-logo" key={member._id}>
        <img src={member.imgUrl} alt="" />
        <MemberHoverModal member={member} />
      </div>
    ))
  }

  const MultiLineTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
      whiteSpace: 'pre-line',
    },
  })

  function renderOverflowIndicator() {
    const additionalMembers = task['members' + cmpId]?.slice(1) || []
    const additionalMembersCount = additionalMembers.length

    if (additionalMembersCount > 0) {
      return (
        <div className="overflow-indicator flex align-center justify-center">
          <MultiLineTooltip
            title={additionalMembers
              .map((member) => member.fullname)
              .join('\n')}
            arrow
          >
            <div className="overflow-tooltip-indicator">
              +{additionalMembersCount}
            </div>
          </MultiLineTooltip>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className="cell member-picker-cell">
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
          <div className="cell">
            {currentUsers.length > 0 ? (
              <div className="avatars-wrapper flex align-center">
                {renderAvatars()}
                {renderOverflowIndicator()}
              </div>
            ) : (
              <div className="avatars-wrapper" style={{ opacity: '0.2' }}>
                <PersonRoundedIcon />
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </>
  )
}
