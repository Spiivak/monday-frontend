import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'
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
import { ContextBtn } from '../ContextBtn'
import { EditableText } from '../EditableText'
import AddColumnBtn from './Columns/AddColumnBtn'
export function BoardViewGroup({ group, boardId, cmpsOrder }) {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    setColumns([
      {
        Header: 'task',
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
          case 'TimeLinePicker':
            accessor = 'timeline' + cmp.id
            break
          case 'FilePicker':
            accessor = 'file' + cmp.id
            break
          default:
            break
        }
        return {
          Header: cmp.title,
          accessor,
          cmp,
        }
      }),
    ])
    setData(group.tasks)
  }, [cmpsOrder, group])

  // * TASK
  function onTaskUpdate(cmpType, cmpId, data, task) {
    updateTask(boardId, group.id, task.id, cmpType, cmpId, task, data)
  }

  function onDeleteTask(boardId, groupId, taskId) {
    removeTask(boardId, groupId, taskId)
  }

  function saveNewTask(title) {
    const newTask = { title }
    addTask(boardId, group.id, newTask)
    setNewTaskTitle('')
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <section className="board-view-group">
      <h2 className="group-title flex gap8">
        <ContextBtn type="group" onDeleteGroup={onDeleteGroup} /> {group.title}{' '}
        <span>{group.tasks.length} items / 0 subitems</span>
      </h2>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th style={{ width: '80px' }}>
                  <div className="flex align-center justify-center">
                    <input type="checkbox" />
                  </div>
                </th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div className="flex align-center space-between hoverable">
                      <EditableText
                        initialText={column.render('Header')}
                        onSave={(text) => {
                          onUpdateColumn(
                            boardId,
                            column.cmp.id,
                            column.cmp,
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
                <th style={{ width: '80px' }}>
                  <AddColumnBtn
                    onAddColumn={(type) => onAddColumn(boardId, type)}
                  />
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr className="hoverable" {...row.getRowProps()}>
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
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      <DynamicTableCell
                        cmp={cell.column.cmp.type}
                        cmpId={cell.column.cmp.id}
                        onTaskUpdate={onTaskUpdate}
                        task={cell.row.original}
                      />
                    </td>
                  ))}
                  <td> </td>
                </tr>
              )
            })}
            <tr>
              <td style={{ width: '80px' }}>
                <div className="flex align-center justify-center">
                  <input type="checkbox" />
                </div>
              </td>
              <td colSpan={columns.length + 2}>
                <EditableText initialText={'Add item'} onSave={saveNewTask} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
