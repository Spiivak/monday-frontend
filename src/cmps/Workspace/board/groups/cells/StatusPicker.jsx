import { Edit } from '@mui/icons-material'
import { ConfigProvider, Dropdown } from 'antd'
import React from 'react'

export function StatusPicker({
  task,
  cmpId,
  handleUpdateTask,
  cmpsOrder,
  board,
  loggedInUser,
}) {
  const colName =
    cmpsOrder.find((cmp) => cmp.type === 'StatusPicker')?.title || ''
  const oldValue = task['status' + cmpId] || ''

  const selectedLabel = board['labels' + cmpId]?.find(
    (label) => label.id === task['status' + cmpId]
  )

  function getLabelById(labelId) {
    return board['labels' + cmpId]?.find((label) => label.id === labelId)
  }

  async function handleUpdateStatus(status) {
    try {
      const updatedTask = { ...task, ['status' + cmpId]: status }
      await handleUpdateTask('StatusPicker', status, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          by: loggedInUser,
          createdAt: Date.now(),
          title: updatedTask.title || '',
          colName,
          oldValue: getLabelById(oldValue)?.title || 'Haven\'t Starterd',
          oldValueColor: getLabelById(oldValue)?.color || '#eee',
          newValue: getLabelById(status)?.title,
          newValueColor: getLabelById(status)?.color,
        },
        updatedTask
      )
    } catch (err) {
      console.error(err)
    }
  }

  const labelItems =
    board['labels' + cmpId]?.map((label, idx) => ({
      key: idx + 1,
      backgroundcolor: label.color,
      status: label.title,
      label: (
        <button
          key={label.id}
          className="btn-ctn medium-primary"
          style={{
            backgroundColor: label.color,
            width: '152px',
            height: '32px',
            margin: '10px 10px 0 10px',
          }}
          onClick={() => handleUpdateStatus(label.id)}>
          {label.title}
        </button>
      ),
    })) || []

  const items = [
    ...labelItems,
    {
      type: 'divider',
    },
    {
      key: (board['labels' + cmpId]?.length || 0) + 1,
      label: (
        <div className="flex align-center justify-center gap8 label-btn">
          <Edit />
          Edit Labels
        </div>
      ),
    },
  ]

  return (
    <div className="cell status-picker-cell">
      <ConfigProvider
        theme={{
          boxShadow: 'none',
        }}>
        <Dropdown
          rootClassName="dropdown-status-picker"
          menu={{
            items,
          }}
          trigger={['click']}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}>
          <div style={{ width: '100%', height: '100%' }}>
            <button
              className="label-btn"
              style={{
                backgroundColor: selectedLabel?.color || '#c4c4c4',
                color: 'white',
              }}>
              {selectedLabel?.title || "Haven't Started"}
            </button>
          </div>
        </Dropdown>
      </ConfigProvider>
    </div>
  )
}
