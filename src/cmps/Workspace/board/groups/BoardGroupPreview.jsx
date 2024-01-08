import React, { useEffect, useState, useMemo } from 'react'
import { useTable } from 'react-table'
import { SortableTask } from './DnD/SortableTask'

//DND imports
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

//For DnD
import {
  addColumn,
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  setLoading,
  updateColumn,
  updateGroup,
  updateTask,
} from '../../../../store/actions/board.actions'
import { AddSmallIcon, NavigationChevronDownIcon } from '../../../Icons'
import { ContextBtn } from '../../../ContextBtn'
import { EditableText } from '../EditableText'
import AddColumnBtn from './cells/AddColumnBtn'
import { Widgets } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

export function BoardGroupPreview({ group, boardId, cmpsOrder }) {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const [initText, setInitText] = useState('')
  setLoading

  useEffect(() => {
    setColumns([
      {
        Header: 'Item',
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
          Header: cmp.title,
          accessor,
          cmp,
        }
      }),
    ])
    setData(group.tasks)
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
    console.log(boardId, groupId, newGroup)
    updateGroup(boardId, groupId, newGroup)
  }

  const [activeId, setActiveId] = useState()
  const items = useMemo(() => data?.map(({ id }) => id), [data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null
    }
    const row = rows.find(({ original }) => original.id === activeId)
    prepareRow(row)
    return row
  }, [activeId, rows, prepareRow])
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
        <h2 className="group-title flex editable-txt">
          <EditableText
            type={'groupTitle'}
            initialText={group.title}
            onSave={(text) => {
              onUpdateGroup(boardId, group.id, group, text)
            }}
            placeholder={group.title}
          />
        </h2>
        <span>{group.tasks.length} items </span>
      </div>
      <div className="board-table-container">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th>
                    <div className="checkbox-cell flex align-center justify-center">
                      {/* TODO: Create store for selected items */}
                      <input type="checkbox" />
                    </div>
                  </th>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th {...column.getHeaderProps()}>
                        {column.id === 'title' ? (
                          <div className="wrapper grid th-header pad8x">
                            <Tooltip title="This title cannot be edited" arrow>
                            <span className='gc1'>{column.render('Header')}</span>
                            </Tooltip>
                          </div>
                        ) : (
                          <div className="wrapper grid th-header pad8x">
                            <div className="wrapper2 gc1">
                              <EditableText
                                type={'columnTitle'}
                                initialText={column.render('Header')}
                                onSave={(text) => {
                                  onUpdateColumn(boardId, column.cmp.id, column.cmp, text)
                                }}
                              />
                            </div>
                            <div className="wrapper3 gc2">
                              <ContextBtn
                                type="column"
                                onDeleteColumn={() => onDeleteColumn(boardId, column.cmp.id)}
                              />
                            </div>
                          </div>
                        )}
                      </th>
                    );
                  })}
                  <th>
                    <AddColumnBtn
                      onAddColumn={(type) => onAddColumn(boardId, type)}
                    />
                  </th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <SortableTask
                      key={row.original.id}
                      id={row.original.id}
                      row={row}
                      onTaskUpdate={onTaskUpdate}
                      onDeleteTask={onDeleteTask}
                      boardId={boardId}
                      group={group}
                      groupId={group.id}
                    />
                  )
                })}
              </SortableContext>
              <tr className="">
                <td>
                  <div className="checkbox-cell flex align-center justify-center">
                    <input type="checkbox" />
                  </div>
                </td>
                <td colSpan={columns.length + 2}>
                  <div className="wrapper flex align-center" style={{ marginLeft: '20px'}}>
                    <EditableText
                      initialText={initText}
                      onSave={saveNewTask}
                      placeholder={'+ Add Item'}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </DndContext>
      </div>
    </section>
  )
}
