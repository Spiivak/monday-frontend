import { Dropdown } from 'antd'

export function StatusPicker({ task, cmpId, handleUpdateTask }) {
  const items = [
    {
      key: '1',
      backgroundcolor: '#00C875',
      status: 'Done',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{ backgroundColor: '#00C875', width: '100%' }}
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
          style={{ backgroundColor: '#FDAB3D', width: '100%' }}
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
          style={{ backgroundColor: '#E2445C', width: '100%' }}
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
      label: <button className="label-btn">Edit Labels</button>,
    },
  ]
  const bgc = items.reduce((acc, item) => {
    if (item.status === task['status' + cmpId]) {
      return item.backgroundcolor
    }
    return acc
  }, '')

  return (
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
  )
}
