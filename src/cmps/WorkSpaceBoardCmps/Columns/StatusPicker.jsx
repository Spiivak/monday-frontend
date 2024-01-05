import { Dropdown } from 'antd'

export function StatusPicker({ task, handleUpdateTask }) {
  const items = [
    {
      key: '1',
      backgroundColor: '#00C875',
      status: 'done',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{ backgroundColor: '#00C875', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'done', task)}
        >
          done
        </button>
      ),
    },
    {
      key: '2',
      backgroundColor: '#FDAB3D',
      status: 'in-progress',
      label: (
        <button
          className="btn-ctn medium-primary "
          style={{ backgroundColor: '#FDAB3D', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'in-progress', task)}
        >
          in-progress
        </button>
      ),
    },
    {
      key: '3',
      backgroundColor: '#E2445C',
      status: 'stuck',
      label: (
        <button
          className="btn-ctn medium-primary"
          style={{ backgroundColor: '#E2445C', width: '100%' }}
          onClick={() => handleUpdateTask('StatusPicker', 'stuck', task)}
        >
          stuck
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
    if (item.status === task.status) {
      return item.backgroundColor
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
        <button className="label-btn" style={{ backgroundColor: bgc }}>
          {task.status || 'empty'}
        </button>
      </div>
    </Dropdown>
  )
}
