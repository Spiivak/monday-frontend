import React, { useState } from 'react'
import { DynamicTableCell } from '../DynamicTableCell'
import { EditableText } from '../../editableText/EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import { useSelector } from 'react-redux';
import { saveSelectedTasks } from '../../../../../store/actions/board.actions';
import { BatchMenu } from './BatchMenu';
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
  const selectedTask = useSelector((storeState) => storeState.boardModule.selectedTask)
  
  const [checkedTasks, setCheckedTasks] = useState([]);
  console.log('checkedTasks:', checkedTasks)

 function handleChange(row, event) {
    console.log('handleChange  row:', row)
    const { checked } = event.target
    const taskId = row.id
    setCheckedTasks((prevCheckedTasks) => {
      const updatedTasks = checked
        ? [...prevCheckedTasks, taskId]
        : prevCheckedTasks.filter((id) => id !== taskId);
  
      saveSelectedTasks(updatedTasks);

      return updatedTasks;
    })
  
  }


  return (
    <>
      {rows.map((row, rowIdx) => (
        <React.Fragment key={row.id}>
          <div
            style={{
              '--before-color': group.style.color,
              gridRow: rowIdx + 2,
              gridColumn: 1,
            }}
            className="first-column group-table-cell checkbox-cell flex align-center justify-center hoverable relative">
            <div className="hidden-hover absolute" style={{ right: '105%' }}>
              <ContextBtn
                onDeleteRow={() => onDeleteTask(group.id, row.id)}
                type={'row'}
              />
            </div>
            <input type="checkbox" onChange={(event) => handleChange(row, event)} />
          </div>
          {columns.map(
            (column, colIdx) => (
              <React.Fragment key={column.id}>
                <div
                  style={{ gridRow: rowIdx + 2, gridColumn: colIdx + 2 }}
                  className={`group-table-cell ${column.cmp.type}`}>
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
                  className="group-table-cell"></div>
              </React.Fragment>
            ) // <h1>{JSON.stringify(row[column.accessor])}</h1>
          )}
        </React.Fragment>
      ))}
      <div
        style={{
          '--before-color': group.style.color,
          gridRow: rows.length + 2,
          gridColumn: 1,
        }}
        className="first-column last-row-cell last-row group-table-cell checkbox-cell flex align-center justify-center">
        <input disabled type="checkbox" />
      </div>
      <div
        style={{
          gridRow: rows.length + 2,
          gridColumn: `2 /${columns.length + 3}`,
        }}
        className="group-table-cell last-row">
        <div
          className="wrapper flex align-center add-task-lr "
          style={{
            marginLeft: '20px',
          }}>
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
