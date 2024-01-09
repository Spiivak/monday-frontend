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
    <div className="group-table-body-section flex column">
      {rows.map((row) => (
        <div key={row.id} className="group-table-row flex">
          <div className="group-table-cell">
            <div className="checkbox-cell flex align-center justify-center">
              <input type="checkbox" />
            </div>
          </div>
          {columns.map(
            (column) => (
              <React.Fragment key={column.id}>
                <div className="group-table-cell">
                  <DynamicTableCell
                    cmp={column.cmp.type}
                    cmpId={column.id}
                    group={group}
                    onTaskUpdate={onTaskUpdate}
                    task={row}
                  />
                </div>
                            <div className="group-table-cell"></div>
              </React.Fragment>
            ) // <h1>{JSON.stringify(row[column.accessor])}</h1>
          )}
        </div>
      ))}
      <div className="group-table-row flex">
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
    </div>
  )
}
