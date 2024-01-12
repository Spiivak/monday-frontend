import React, { useState } from 'react'
import { DynamicTableCell } from '../DynamicTableCell'
import { EditableText } from '../../editableText/EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import { useSelector } from 'react-redux'
import { saveSelectedTasks } from '../../../../../store/actions/board.actions'

export function GroupTableBody({
  rows,
  columns,
  group,
  onTaskUpdate,
  onDeleteTask,
  initText,
  saveNewTask,
  cmpsOrder,
}) {
  const selectedTask = useSelector(
    (storeState) => storeState.boardModule.selectedTask
  )
  const [checkedTasks, setCheckedTasks] = useState([])

  function handleChange(row, event) {
    console.log('handleChange  row:', row)
    const { checked } = event.target
    const taskId = row.id
    setCheckedTasks((prevCheckedTasks) => {
      const updatedTasks = checked
        ? [...prevCheckedTasks, taskId]
        : prevCheckedTasks.filter((id) => id !== taskId)

      saveSelectedTasks(updatedTasks)

      return updatedTasks
    })
  }

  return (
    <>
      {rows.map((row, rowIdx) => (
        <div className="table-body-row">
          <div
            style={{
              '--before-color': group.style.color,
              gridRow: rowIdx + 2,
              gridColumn: 1,
            }}
            className="first-column group-table-cell checkbox-cell flex align-center justify-center hoverable relative"
          >
            <div className="hidden-hover absolute" style={{ right: '105%' }}>
              <ContextBtn
                onDeleteRow={() => onDeleteTask(group.id, row.id)}
                type={'row'}
              />
            </div>
            <input
              type="checkbox"
              onChange={(event) => handleChange(row, event)}
            />
          </div>
          {columns.map((column, colIdx) => (
            <React.Fragment key={column.id}>
              <div
                style={{ gridRow: rowIdx + 2, gridColumn: colIdx + 2 }}
                className={`group-table-cell ${column.cmp.type}`}
              >
                <DynamicTableCell
                  cmpsOrder={cmpsOrder}
                  cmp={column.cmp.type}
                  cmpId={column.id}
                  group={group}
                  onTaskUpdate={onTaskUpdate}
                  task={row}
                />
              </div>
              <div
                style={{
                  gridRow: rowIdx + 2,
                  gridColumn: columns.length + 2,
                }}
                className="group-table-cell"
              ></div>
            </React.Fragment>
          ))}
        </div>
      ))}
      <div className="table-body-row last-row-cell last-row">
        <div
          style={{
            '--before-color': group.style.color,
          }}
          className="first-column last-row-cell  group-table-cell checkbox-cell flex align-center justify-center hoverable relative"
        >
          <input disabled type="checkbox" />
        </div>
        <div
          className="group-table-cell wrapper flex align-center add-task-lr "
          style={{
            marginLeft: '20px',
          }}
        >
          <EditableText
            type={'addTask'}
            initialText={initText}
            onSave={saveNewTask}
            placeholder={'+ Add task'}
          />
        </div>
      </div>
    </>
  )
}
