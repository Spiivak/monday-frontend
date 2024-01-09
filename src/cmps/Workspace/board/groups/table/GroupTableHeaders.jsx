import { Tooltip } from 'antd'
import React from 'react'
import { EditableText } from '../../EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import AddColumnBtn from '../cells/AddColumnBtn'
export function GroupTableHeaders({
  columns,
  onUpdateColumn,
  boardId,
  onDeleteColumn,
  onAddColumn,
}) {
  return (
    <>
      <div className="group-table-header-cell checkbox-cell flex align-center justify-center">
        {/* TODO: Create store for selected items */}
        <input type="checkbox" />
      </div>
      {/* <div className="group-table-header-cell flex">
        <div className="wrapper grid th-header pad8x">
          <Tooltip title="This title cannot be edited" arrow>
            <span className="gc1">Task</span>
          </Tooltip>
        </div>
      </div> */}
      {columns.map((column) => (
        <div
          key={column.id}
          className="group-table-header-cell wrapper grid th-header pad8x">
          <div className="wrapper2 gc1 flex justify-center">
            <EditableText
              type={'columnTitle'}
              initialText={column.Header}
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
      ))}
      <div className="group-table-header-cell wrapper grid th-header pad8x">
        <AddColumnBtn onAddColumn={(type) => onAddColumn(boardId, type)} />
      </div>
    </>
  )
}
