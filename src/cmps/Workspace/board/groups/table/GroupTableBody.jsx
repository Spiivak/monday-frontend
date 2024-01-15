import React, { useEffect, useState } from 'react'
import { DynamicTableCell } from '../DynamicTableCell'
import { EditableText } from '../../editableText/EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import { useSelector } from 'react-redux'
import {
  saveSelectedTasks,
  updateTasks,
} from '../../../../../store/actions/board.actions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export function GroupTableBody({
  board,
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
    const { checked } = event.target
    const taskId = row.id // Use row.id directly

    const selectedTask = { taskId, groupId, boardId }

    const updatedTasks = checked
      ? [...checkedTaskIds, selectedTask]
      : checkedTaskIds.filter(
          (checkedTask) =>
            checkedTask.taskId !== taskId || checkedTask.groupId !== groupId
        )

    saveSelectedTasks(updatedTasks)

    return updatedTasks
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const draggedRowIndex = result.source.index
    let droppedRowIndex = result.destination.index

    if (draggedRowIndex <= droppedRowIndex) droppedRowIndex++

    const updatedRows = [...rows]

    const [draggedRow] = updatedRows.splice(draggedRowIndex, 1)
    updatedRows.splice(droppedRowIndex, 0, draggedRow)
    updateTasks(board._id, group.id, updatedRows)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board-group-table-container"
            style={{ height: '100%' }}
          >
            {rows.map((row, index) => (
              <Draggable
                key={row.id}
                draggableId={row.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`table-body-row ${
                      checkedTaskIds.some(
                        (checkedTask) => checkedTask.taskId === row.id
                      )
                        ? 'checked'
                        : ''
                    }`}
                    style={{
                      ...provided.draggableProps.style,
                      // Add any styles for the dragged state if needed
                    }}
                  >
                    <div
                      style={{
                        '--before-color': group.style.color,
                        // gridRow: index + 2,
                        gridColumn: 1,
                      }}
                      className="first-column group-table-cell checkbox-cell flex align-center justify-center hoverable relative"
                    >
                      <div
                        className="context absolute"
                        style={{ zIndex: 1000, right: '115%' }}
                      >
                        <ContextBtn
                          onDeleteRow={() => onDeleteTask(group.id, row.id)}
                          type={'row'}
                        />
                      </div>
                      <input
                        type={`checkbox`}
                        onChange={(event) =>
                          handleChange(row, event, group.id, boardId)
                        }
                        checked={checkedTaskIds.some(
                          (checkedTask) => checkedTask.taskId === row.id
                        )}
                      />
                    </div>
                    {columns.map((column, colIdx) => (
                      <React.Fragment key={column.id}>
                        <div
                          style={{
                            // gridRow: index + 2,
                            gridColumn: colIdx + 2,
                          }}
                          className={`group-table-cell ${column.cmp.type}`}
                        >
                          <DynamicTableCell
                            cmpsOrder={cmpsOrder}
                            cmp={column.cmp.type}
                            cmpId={column.id}
                            group={group}
                            onTaskUpdate={onTaskUpdate}
                            task={row}
                            board={board}
                          />
                        </div>
                        <div
                          style={{
                            // gridRow: index + 2,
                            gridColumn: columns.length + 2,
                          }}
                          className="group-table-cell"
                        ></div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
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
                  placeholder={`+ Add ${
                    board?.option ? board?.option.slice(0, -1) : 'Task'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
