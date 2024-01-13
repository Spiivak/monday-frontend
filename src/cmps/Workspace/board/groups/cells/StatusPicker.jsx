import { Edit } from '@mui/icons-material'
import { Button, ConfigProvider, Divider, Dropdown, Space } from 'antd'
import useToken from 'antd/es/theme/useToken'
import React from 'react'

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
        <div className="flex align-center justify-center gap8 label-btn">
          <Edit />
          Edit Labels
        </div>
      ),
    },
  ]
  // {
  //   key: '1',
  //   backgroundcolor: '#00C875',
  //   status: 'Done',
  //   label: (
  //     <button
  //       className="btn-ctn medium-primary"
  //       style={{
  //         backgroundColor: '#00C875',
  //         width: '152px',
  //         height: '32px',
  //         margin: '10px 10px 0 10px',
  //       }}
  //       onClick={() => handleUpdateStatus('Done')}>
  //       Done
  //     </button>
  //   ),
  // },
  // {
  //   key: '2',
  //   backgroundcolor: '#FDAB3D',
  //   status: 'Working on it',
  //   label: (
  //     <button
  //       className="btn-ctn medium-primary "
  //       style={{
  //         backgroundColor: '#FDAB3D',
  //         width: '152px',
  //         height: '32px',
  //         margin: '0 10px',
  //       }}
  //       onClick={() => handleUpdateStatus('Working on it')}>
  //       Working on it
  //     </button>
  //   ),
  // },
  // {
  //   key: '3',
  //   backgroundcolor: '#E2445C',
  //   status: 'Stuck',
  //   label: (
  //     <button
  //       className="btn-ctn medium-primary"
  //       style={{
  //         backgroundColor: '#E2445C',
  //         width: '152px',
  //         height: '32px',
  //         margin: '0 10px 10px 10px',
  //       }}
  //       onClick={() => handleUpdateStatus('Stuck')}>
  //       Stuck
  //     </button>
  //   ),
  // },
  // {
  //   type: 'divider',
  // },
  // {
  //   key: '4',
  //   label: (
  //     <div className="flex align-center justify-center gap8 label-btn">
  //       <Edit />
  //       Edit Labels
  //     </div>
  //   ),
  // },
  // ]
  const bgc = items.reduce((acc, item) => {
    if (item.status === task['status' + cmpId]) {
      return item.backgroundcolor
    }
    return acc
  }, '')

  const contentStyle = {
    // backgroundColor: 'black',
    // borderRadius: 'red',
    // boxShadow: 'blue',
  }

  const menuStyle = {
    boxShadow: 'none',
  }

  const selectedLabel = board['labels' + cmpId].find(
    (label) => label.id === task['status' + cmpId]
  )

  return (
    <div className="cell status-picker-cell">
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
