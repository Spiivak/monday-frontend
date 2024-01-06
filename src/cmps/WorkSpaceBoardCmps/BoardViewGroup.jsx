import React, { useEffect, useState } from 'react'
import { DynamicTableCell } from './DynamicTableCell'
import {
  addColumn,
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  updateColumn,
  updateTask,
} from '../../store/actions/board.actions'
import { useParams } from 'react-router-dom'
import { AddSmallIcon, MenuIcon, NavigationChevronDownIcon } from '../Icons'
import { ContextBtn } from '../ContextBtn'
import { EditableText } from '../EditableText'
import AddColumnBtn from './Columns/AddColumnBtn'
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

  const [columnHeaders, setColumnHeaders] = useState([])
  const [taskRows, setTaskRows] = useState([])

  useEffect(() => {
    setColumnHeaders(cmpsOrder)
    setTaskRows(group.tasks)
  }, [cmpsOrder, group])

  function onTaskUpdate(cmpType, cmpId, data, task) {
    updateTask(boardId, group.id, task.id, cmpType, cmpId, task, data)
  }

  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  function onDeleteColumn(boardId, cmpId) {
    removeColumn(boardId, cmpId)
  }

  function onUpdateColumn(boardId, columnId, column, data) {
    const columnToUpdate = { ...column, title: data }
    updateColumn(boardId, columnId, columnToUpdate)
  }

  function onAddColumn(boardId, type) {
    addColumn(boardId, type)
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

  function saveNewTask(title) {
    const newTask = { title }
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
      <div className="board-title flex gap8">
        <div className="menu-btn flex gap8">
          <ContextBtn type="group" onDeleteGroup={onDeleteGroup} />
        </div>
        <div className="arrow-btn">
          <button className='btn-icon small-transparent'>
          <NavigationChevronDownIcon />
          </button>
        </div>
        <h2 className="group-title flex editable-txt">{group.title}</h2>
        <span>{group.tasks.length} items / 0 subitems</span>
      </div>
      <div>
        <table>
          <thead>
            <tr style={{}}>
              <th style={{ width: '80px' }}>
                <div className="flex align-center justify-center">
                  <input type="checkbox" />
                </div>
              </th>
              <th>task</th>
              {columnHeaders.map((columnHeader, idx) => (
                <th key={idx}>
                  <div className="flex align-center space-between hoverable">
                    <EditableText
                      initialText={columnHeader.title}
                      onSave={(text) => {
                        onUpdateColumn(
                          boardId,
                          columnHeader.id,
                          columnHeader,
                          text
                        )
                      }}
                    />
                    <ContextBtn
                      type="column"
                      onDeleteColumn={() =>
                        onDeleteColumn(boardId, columnHeader.id)
                      }
                    />
                  </div>
                </th>
              ))}
              <th style={{ width: '80px' }}><AddColumnBtn onAddColumn={(type) => onAddColumn(boardId, type)} /></th>
            </tr>
          </thead>
          <tbody>
            {taskRows.map((task) => (
              <tr key={task.id} className="hoverable">
                <td style={{ width: '80px' }}>
                  <div className="flex align-center justify-center relative ">
                    <div className="row-context absolute">
                      <ContextBtn
                        type="row"
                        onDeleteRow={() =>
                          onDeleteTask(boardId, group.id, task.id)
                        }
                      />
                    </div>
                    <input type="checkbox" />
                  </div>
                </td>
                <td>
                  <EditableText
                    initialText={task.title}
                    onSave={(text) => onTaskUpdate('task', '', text, task)}
                  />
                </td>
                {columnHeaders.map((columnHeader, idx) => (
                  <td key={idx}>
                    <DynamicTableCell
                      cmp={columnHeader.type}
                      cmpId={columnHeader.id}
                      onTaskUpdate={onTaskUpdate}
                      task={task}
                    />
                  </td>
                ))}
                <td style={{ width: '80px' }}> </td>
              </tr>
            ))}
            <tr>
              <td style={{ width: '80px' }}>
                <div className="flex align-center justify-center">
                  <input type="checkbox" />
                </div>
              </td>
              <td colSpan={columnHeaders.length + 2}>
                <EditableText initialText={''} onSave={saveNewTask} placeholder={'Add Item'} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
