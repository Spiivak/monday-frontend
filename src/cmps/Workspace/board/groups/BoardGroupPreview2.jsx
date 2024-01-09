import { GroupTableBody } from './table/GroupTableBody'
import { GroupTableHeaders } from './table/GroupTableHeaders'
import React, { useEffect, useState } from 'react'
import { EditableText } from '../EditableText'
import { ContextBtn } from '../../../ContextBtn'
import { NavigationChevronDownIcon } from '../../../Icons'
import {
  addColumn,
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  setBoardLoading,
  updateColumn,
  updateGroup,
  updateTask,
} from '../../../../store/actions/board.actions'
import { Tooltip } from 'antd'
import AddColumnBtn from './cells/AddColumnBtn'
import { DynamicTableCell } from './DynamicTableCell'

export function BoardGroupPreview2({ group, boardId, cmpsOrder }) {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [initText, setInitText] = useState('')

  useEffect(() => {
    setColumns([
      {
        id: 0,
        Header: 'Task',
        accessor: 'title',
        cmp: { id: 0, title: 'task', type: 'title' },
      },
      ...cmpsOrder.map((cmp) => {
        let accessor
        switch (cmp.type) {
          case 'StatusPicker':
            accessor = 'status' + cmp.id
            break
          case 'DatePicker':
            accessor = 'date' + cmp.id
            break
          case 'DescriptionPicker':
            accessor = 'description' + cmp.id
            break
          case 'TimelinePicker':
            accessor = 'timeline' + cmp.id
            break
          case 'FilePicker':
            accessor = 'file' + cmp.id
            break
          case 'MemberPicker':
            accessor = 'members' + cmp.id
            break
          case 'LinkPicker':
            accessor = 'link' + cmp.id
            break
          case 'NumbersPicker':
            accessor = 'number' + cmp.id
            break
          default:
            break
        }
        return {
          id: cmp.id,
          Header: cmp.title,
          accessor,
          cmp,
        }
      }),
    ])
    setRows(group.tasks)
  }, [cmpsOrder, group])

  // * TASK
  async function onTaskUpdate(cmpType, cmpId, data, task) {
    try {
      await updateTask(boardId, group.id, task.id, cmpType, cmpId, task, data)
    } catch (err) {
      console.log(err)
    }
  }

  function onDeleteTask(boardId, groupId, taskId) {
    removeTask(boardId, groupId, taskId)
  }

  function saveNewTask(title) {
    const newTask = { title }
    addTask(boardId, group.id, newTask)
    setInitText('')
  }

  // * COLUMN
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

  // * GROUP
  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  function onUpdateGroup(boardId, groupId, group, data) {
    const newGroup = { ...group, title: data }
    updateGroup(boardId, groupId, newGroup)
  }

  //!!! TURN OFF BOARD LOADER !!!//
  setBoardLoading(false)

  return (
    <section className="board-view-group">
      <div className="board-title flex gap8">
        <div className="menu-btn flex gap8">
          <ContextBtn type="group" onDeleteGroup={onDeleteGroup} />
        </div>
        <div className="arrow-btn">
          <button className="btn-icon small-transparent">
            <NavigationChevronDownIcon />
          </button>
        </div>
        <h2 style={{ color: group.style.color }} className="group-title flex">
          <EditableText
            type={'groupTitle'}
            initialText={group.title}
            textColor={group.style.color}
            onSave={(text) => {
              onUpdateGroup(boardId, group.id, group, text)
            }}
            placeholder={group.title}
          />
        </h2>
        <span>{group.tasks.length} items </span>
      </div>
      <div className="board-group-table-container">
        <GroupTableHeaders
          columns={columns}
          onUpdateColumn={onUpdateColumn}
          boardId={boardId}
          onDeleteColumn={onDeleteColumn}
          onAddColumn={onAddColumn}
        />

        <GroupTableBody
          rows={rows}
          columns={columns}
          group={group}
          onTaskUpdate={onTaskUpdate}
          initText={initText}
          saveNewTask={saveNewTask}
        />

        <div className="group-table-footer-section flex">
          <div className="group-table-footer-cell flex"></div>
        </div>
      </div>
    </section>
  )
}
