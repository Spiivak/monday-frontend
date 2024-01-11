import { Tooltip } from 'antd'
import React from 'react'
// import { EditableText } from '../../EditableText'
import { ContextBtn } from '../../../../ContextBtn'
import AddColumnBtn from '../cells/AddColumnBtn'
import { EditableText } from '../../editableText/EditableText'
export function GroupTableHeaders({
  columns,
  onUpdateColumn,
  boardId,
  group,
  onDeleteColumn,
  onAddColumn,
}) {
  return (
    <>
      <div style={{'--before-color':group.style.color}} className="first-column group-table-header-cell checkbox-cell flex align-center justify-center first-row-cell">
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
      {columns.map((column, idx) => (
        <div
          key={column.id}
          className={`group-table-header-cell wrapper th-header flex align-center justify-center pad8 ${column.cmp.type}`}>
          {/* <div className="wrapper2 gc1 flex align-center justify-center"> */}
            {idx !== 0 ? <EditableText
              type={'columnTitle'}
              initialText={column.Header}
              onSave={(text) => {
                onUpdateColumn(boardId, column.cmp.id, column.cmp, text)
              }}
            /> : <span>{column.Header}</span>}
          {/* </div> */}
            <ContextBtn
              type="column"
              onDeleteColumn={() => onDeleteColumn(boardId, column.cmp.id)}
            />
        </div>
      ))}
      <div className="group-table-header-cell wrapper grid th-header pad8x">
        <AddColumnBtn onAddColumn={(type) => onAddColumn(boardId, type)} />
      </div>
    </>
  )
}
