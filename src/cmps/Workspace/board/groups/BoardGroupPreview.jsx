import { GroupTableBody } from './table/GroupTableBody'
import { GroupTableHeaders } from './table/GroupTableHeaders'

import React, { useEffect, useState } from 'react'
// import { EditableText } from '../EditableText'
import { ContextBtn } from '../../../ContextBtn'
import { NavigationChevronDownIcon } from '../../../Icons'
import {
  addColumn,
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  updateColumn,
  updateGroup,
  updateTask,
} from '../../../../store/actions/board.actions'
import { EditableText } from '../editableText/EditableText'
import { GroupTableFooter } from './table/GroupTableFooter'
import { boardService } from '../../../../services/board.service'

export function BoardGroupPreview({ board, group, boardId, cmpsOrder }) {
  // const [columns, setColumns] = useState([])
  // const [rows, setRows] = useState([])
  const [initText, setInitText] = useState('')
  const [isTableOpen, setIsTableOpen] = useState(true)


    const columns = [
      {
        id: 0,
        Header: board?.option || 'Tasks',
        accessor: 'title',
        cmp: { id: 0, title: board?.option || 'Tasks', type: 'title' },
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
    ]

    const rows = group.tasks


  // * TASK
  function onTaskUpdate(cmpType, cmpId, data, task) {
    try {
      updateTask(boardId, group.id, task.id, cmpType, cmpId, task, data)
    } catch (err) {
      console.error(err)
    }
  }

  function onDeleteTask(groupId, taskId) {
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
    addColumn(boardId, type, board)
  }

  // * GROUP
  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  function onUpdateGroup(boardId, groupId, group, data) {
    const newGroup = { ...group, [data.prop]: data.value }
    updateGroup(boardId, groupId, newGroup)
  }

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen)
  }

  return (
    <>
      {isTableOpen && (
        <section className="board-view-group">
          <div className="board-title flex align-center gap8">
            <div className="menu-btn flex align-center">
              <ContextBtn type="group" onDeleteGroup={onDeleteGroup} />
            </div>
            <button
              className="btn-icon small-transparent arrow-btn"
              style={{ color: group.style.color }}
              onClick={toggleTable}>
              <NavigationChevronDownIcon color={group.style.color} />
            </button>
            <h2 style={{ color: group.style.color }} className="group-title">
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
            <span className="task-length">{group.tasks.length} items </span>
          </div>

          {/* Render table only if it's open */}
          <div style={{'--gtc': `39px 350px repeat(${columns.length - 1},200px) minmax(80px,1fr)`,
                      '--gtc-mobile': `0px 200px repeat(${columns.length - 1}, 180px) minmax(80px, 1fr)` }}
            className="board-group-table-container">
            <GroupTableHeaders
              columns={columns}
              group={group}
              onUpdateColumn={onUpdateColumn}
              boardId={boardId}
              onDeleteColumn={onDeleteColumn}
              onAddColumn={onAddColumn}
            />

            <GroupTableBody
              rows={rows}
              columns={columns}
              group={group}
              boardId={boardId}
              onTaskUpdate={onTaskUpdate}
              initText={initText}
              saveNewTask={saveNewTask}
              cmpsOrder={cmpsOrder}
              onDeleteTask={onDeleteTask}
              board={board}
            />

            <GroupTableFooter
              {...{
                board,
                rows,
                columns,
                group,
              }}
            />
          </div>
        </section>
      )}
      {!isTableOpen && (
        <CollapsedTable
          onDeleteGroup={onDeleteGroup}
          group={group}
          rows={rows}
          columns={columns}
          toggleTable={toggleTable}
          onUpdateColumn={onUpdateColumn}
          onAddColumn={onAddColumn}
          boardId={boardId}
          onDeleteColumn={onDeleteColumn}
          onUpdateGroup={onUpdateGroup}
          board={board}
          isTableOpen={isTableOpen}
        />
      )}
    </>
  )
}

function CollapsedTable({
  onDeleteGroup,
  group,
  toggleTable,
  rows,
  columns,
  board,
  onUpdateColumn,
  onAddColumn,
  boardId,
  onDeleteColumn,
  onUpdateGroup,
  isTableOpen,
}) {
  return (
    <section
      className="collapsed-table grid"
      style={{ borderLeftColor: group.style.color }}>
      <div className="left-side">
        <div className="board-title flex align-center gap8">
          <div className="menu-btn flex align-center">
            <ContextBtn type="group" onDeleteGroup={onDeleteGroup} />
          </div>
          <div className="title-section flex column">
            <div className="title flex">
              <button
                className="btn-icon small-transparent collapse-btn"
                style={{ color: group.style.color }}
                onClick={toggleTable}>
                <NavigationChevronDownIcon color={group.style.color} />
              </button>
              <h2
                style={{ color: group.style.color }}
                className="group-title flex">
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
            </div>
            <span className="tasks-length">
              {group.tasks.length} {group.tasks.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <GroupTableFooter
          {...{
            rows,
            columns,
            group,
            board,
            isTableOpen
          }}
        />
      </div>
    </section>
  )
}
