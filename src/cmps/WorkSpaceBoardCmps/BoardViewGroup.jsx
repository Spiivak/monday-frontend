import React, { useEffect, useState, useMemo } from 'react'
import { useTable } from 'react-table'
import { SortableItem } from './DnD/SortableItem'

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
  updateColumn,
  updateGroup,
  updateTask,
} from '../../store/actions/board.actions'
import { NavigationChevronDownIcon } from '../Icons'
import { ContextBtn } from '../ContextBtn'
import { EditableText } from '../EditableText'
import AddColumnBtn from './Columns/AddColumnBtn'

export function BoardViewGroup({ group, boardId, cmpsOrder }) {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const [initText, setInitText] = useState('')


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
          case 'MemberPicker':
            accessor = 'members' + cmp.id
            break
          case 'LinkPicker':
            accessor = 'link' + cmp.id
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

  function onUpdateGroup(boardId, groupId, group, data){
    const newGroup = {...group, title: data}
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
        <h2 className="group-title flex editable-txt"><EditableText initialText={group.title} onSave={()=>{}} placeholder={group.title} /></h2>
        <span>{group.tasks.length} items / 0 subitems</span>
      </div>
      <div>
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
                  <th style={{ width: '80px' }}>
                    <div className="flex align-center justify-center">
                      <input type="checkbox" />
                    </div>
                  </th>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      <div className="flex align-center space-between pad8x gap16 hoverable">
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
                            onDeleteColumn(boardId, column.cmp.id)
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
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <SortableItem
                      key={row.original.id}
                      id={row.original.id}
                      row={row}
                      onTaskUpdate={onTaskUpdate}
                      onDeleteTask={onDeleteTask}
                      boardId={boardId}
                      groupId={group.id}
                    />
                  )
                })}
              </SortableContext>
              <tr>
                <td style={{ width: '80px' }}>
                  <div className="flex align-center justify-center">
                    <input type="checkbox" />
                  </div>
                </td>
                <td colSpan={columns.length + 2}>
                  <EditableText
                    initialText={initText}
                    onSave={saveNewTask}
                    placeholder={'Add Item'}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DndContext>
      </div>
    </section>
  )
}
