import { Edit } from '@mui/icons-material'
import { Button, ConfigProvider, Divider, Dropdown, Space } from 'antd'
import useToken from 'antd/es/theme/useToken'
import React from 'react'

export function StatusPicker({ task, cmpId, handleUpdateTask }) {
  const items = [
    {
      key: '1',
      backgroundcolor: '#00C875',
      status: 'Done',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{
            backgroundColor: '#00C875',
            width: '152px',
            height: '32px',
            margin: '10px 10px 0 10px',
          }}
          onClick={() => handleUpdateTask('StatusPicker', 'Done', task)}
        >
          Done
        </button>
      ),
    },
    {
      key: '2',
      backgroundcolor: '#FDAB3D',
      status: 'Working on it',
      label: (
        <button
          className="btn-ctn medium-primary "
          style={{
            backgroundColor: '#FDAB3D',
            width: '152px',
            height: '32px',
            margin: '0 10px',
          }}
          onClick={() =>
            handleUpdateTask('StatusPicker', 'Working on it', task)
          }
        >
          Working on it
        </button>
      ),
    },
    {
      key: '3',
      backgroundcolor: '#E2445C',
      status: 'Stuck',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{
            backgroundColor: '#E2445C',
            width: '152px',
            height: '32px',
            margin: '0 10px 10px 10px',
          }}
          onClick={() => handleUpdateTask('StatusPicker', 'Stuck', task)}
        >
          Stuck
        </button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <div className="flex align-center justify-center gap8 label-btn">
          <Edit />
          Edit Labels
        </div>
      ),
    },
  ]
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

  return (
    <div className="cell status-picker-cell">
      <ConfigProvider
        theme={{
          boxShadow: 'none',
        }}
      >
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
          }}
        >
          <div className="cell">
            <button
              className="label-btn"
              style={{
                backgroundColor: bgc || '#c4c4c4',
                color: 'white',
              }}
            >
              {task['status' + cmpId] || "Haven't Started"}
            </button>
          </div>
        </Dropdown>
      </ConfigProvider>
    </div>
  )
}
