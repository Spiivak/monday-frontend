import { Edit } from '@mui/icons-material'
import { Button, ConfigProvider, Divider, Dropdown, Space } from 'antd'
import useToken from 'antd/es/theme/useToken'
import React, { useRef } from 'react'

export function StatusPicker({
  task,
  cmpId,
  handleUpdateTask,
  cmpsOrder,
  board,
}) {
  const colName = cmpsOrder.find((cmp) => cmp.type === 'StatusPicker')?.title
  const oldValue = task['status' + cmpId]

  async function handleUpdateStatus(status) {
    try {
      const updatedTask = { ...task, ['status' + cmpId]: status }
      await handleUpdateTask('StatusPicker', status, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: oldValue,
          newValue: status,
        },
        updatedTask
      )
    } catch (err) {
      console.error(err)
    }
  }

  if(!!!board) return
  const items = [
    ...board['labels' + cmpId]?.map((label, idx) => {
      return {
        key: idx + 1,
        backgroundcolor: label.color,
        status: label.title,
        label: (
          <button
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
      }
    }),
    {
      type: 'divider',
    },
    {
      key: board['labels' + cmpId].length + 1,
      label: (
        <div
          onClick={() =>
            openLabelEditModal(
              statusPickerRef,
              `labels${cmpId}`,
              board['labels' + cmpId]
            )
          }
          className="flex align-center justify-center gap8 label-btn">
          <Edit />
          Edit Labels
        </div>
      ),
    },
  ]

  const selectedLabel = board['labels' + cmpId].find(
    (label) => label.id === task['status' + cmpId]
  )

  function openLabelEditModal(statusPickerRef, labelsId) {
    console.log(statusPickerRef, labelsId)
  }

  const statusPickerRef = useRef()

  return (
    <div ref={statusPickerRef} className="cell status-picker-cell">
      <ConfigProvider
        theme={{
          boxShadow: 'none',
        }}>
        {' '}
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
