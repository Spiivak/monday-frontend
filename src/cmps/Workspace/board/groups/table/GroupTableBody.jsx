import React from 'react'
import { EditableText } from '../../EditableText'
import { DynamicTableCell } from '../DynamicTableCell'
export function GroupTableBody({
  rows,
  columns,
  group,
  onTaskUpdate,
  initText,
  saveNewTask,
}) {
  return (
    <>
      {rows.map((row, rowIdx) => (
        <React.Fragment key={row.id}>
          <div
            style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
            className="group-table-cell checkbox-cell flex align-center justify-center">
            <input type="checkbox" />
          </div>
          {columns.map(
            (column, colIdx) => (
              <React.Fragment key={column.id}>
                <div
                  style={{ gridRow: rowIdx + 2, gridColumn: colIdx + 2 }}
                  className="group-table-cell">
                  <DynamicTableCell
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
      <div style={{
          gridRow: rows.length + 2,
          gridColumn: 1,
        }} className="group-table-cell checkbox-cell flex align-center justify-center">
        <input disabled type="checkbox" />
      </div>
      <div
        style={{
          gridRow: rows.length + 2,
          gridColumn: `2 /${columns.length + 3}`,
        }}
        className="group-table-cell">
        <div
          className="wrapper flex align-center"
          style={{
            marginLeft: '20px',
          }}>
          <EditableText
            initialText={initText}
            onSave={saveNewTask}
            placeholder={'+ Add task'}
          />
        </div>
      </div>
    </>
  )
}
