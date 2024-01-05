import React, { useEffect, useState } from 'react'
import { DynamicTableCell } from './DynamicTableCell'
import {
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  updateTask,
} from '../../store/actions/board.actions'
import { useParams } from 'react-router-dom'
import { AddSmallIcon } from '../Icons'
import { ContextBtn } from '../ContextBtn'
import { Table } from 'antd'
export function BoardViewGroup({ group, boardId, cmpsOrder }) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ])
  const [columns, setColumns] = useState([
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
    },
  ])

  useEffect(() => {
    setColumns([
      {
        title: 'task',
        dataIndex: 'taskTitle',
        key: 'taskTitle',
        render: (task) => (
          <>
            <div className="row-context absolute">
              <ContextBtn
                type="row"
                onDeleteRow={() => onDeleteTask(boardId, group.id, task.id)}
              />
            </div>
            <a>{task.title}</a>
          </>
        ),
      },
      ...cmpsOrder.map((cmp, idx) => ({
        title: () => (
          <div className="flex align-center space-between hoverable">
            {cmp}
            <ContextBtn
              type="column"
              onDeleteColumn={() => onDeleteColumn(boardId, cmp)}
            />
          </div>
        ),
        dataIndex: cmp,
        key: cmp,
        render: (task) => (
          <DynamicTableCell
            cmp={cmp}
            onTaskUpdate={onTaskUpdate}
            task={task}
            key={task.id}
          />
        ),
      })),
    ])
    setDataSource(
      group.tasks.map((task, idx) => ({
        key: idx + 1,
        taskTitle: task,
        StatusPicker: task,
        MemberPicker: task,
        DatePicker: task,
        DescriptionPicker: task,
        TimeLinePicker: task,
        FilePicker: task,
      }))
    )
  }, [cmpsOrder, group])

  function onTaskUpdate(cmpType, data, task) {
    updateTask(boardId, group.id, task.id, cmpType, task, data)
  }

  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  function onDeleteColumn(boardId, cmp) {
    removeColumn(boardId, cmp)
  }

  function onDeleteTask(boardId, groupId, taskId) {
    removeTask(boardId, groupId, taskId)
  }

  function handleChange(ev) {
    const value = ev.target.value
    setNewTaskTitle(value)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const newTask = { title: newTaskTitle }
    addTask(boardId, group.id, newTask)
    setNewTaskTitle('')
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <section className="board-view-group">
      <h2 className="group-title flex gap8">
        <ContextBtn type="group" onDeleteGroup={onDeleteGroup} /> {group.title}{' '}
        <span>{group.tasks.length} items / 0 subitems</span>
      </h2>
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>Task</th>
            {cmpsOrder.map((cmp, idx) => (
              <th key={idx}>
                <div className="flex align-center space-between">
                  {cmp}
                  <ContextBtn type="column" onDeleteColumn={()=>onDeleteColumn(boardId,cmp)} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {group.tasks.map((task) => (
            <tr key={task.id}>
              <td className="relative hoverable">
                {task.title}{' '}
                <div className="row-context absolute">
                  <ContextBtn
                    type="row"
                    onDeleteRow={() => onDeleteTask(boardId, group.id, task.id)}
                  />
                </div>
              </td>
              {cmpsOrder.map((cmp, idx) => (
                <td key={idx}>
                  <DynamicTableCell
                    cmp={cmp}
                    task={task}
                    onTaskUpdate={onTaskUpdate}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={cmpsOrder.length + 1}>
              <div className="input-wrapper">
                <div className="icon-wrapper">
                  <AddSmallIcon />
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={handleChange}
                    placeholder={`Add item`}
                  />
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table> */}
    </section>
  )
}
