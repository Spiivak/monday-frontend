import React, { useEffect, useState } from 'react'
import { DynamicTableCell } from '../DynamicTableCell'
import { EditableText } from '../../editableText/EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import { useSelector } from 'react-redux'
import { saveSelectedTasks } from '../../../../../store/actions/board.actions'

export function GroupTableBody({
  rows,
  columns,
  group,
  boardId,
  onTaskUpdate,
  onDeleteTask,
  initText,
  saveNewTask,
  cmpsOrder,
}) {
  const checkedTaskIds = useSelector(
    (storeState) => storeState.boardModule.checkedTaskIds
  )
  function handleChange(row, event, groupId, boardId) {
    const { checked } = event.target;
    const taskId = row.id; // Use row.id directly
    
    const selectedTask = { taskId, groupId, boardId };
  
    const updatedTasks = checked
      ? [...checkedTaskIds, selectedTask]
      : checkedTaskIds.filter(
          (checkedTask) =>
            checkedTask.taskId !== taskId || checkedTask.groupId !== groupId
        );
  
    saveSelectedTasks(updatedTasks);
  
    return updatedTasks;
  }
  return (
    <>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="table-body-row">
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
              onChange={(event) => handleChange(row, event, group.id, boardId)}
              checked={checkedTaskIds.some((checkedTask) => checkedTask.taskId === row.id)}
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
