import React from 'react'
import { ContextBtn } from '../../../../ContextBtn'
import AddColumnBtn from '../cells/AddColumnBtn'
import { EditableText } from '../../editableText/EditableText'
import { useSelector } from 'react-redux'
import { saveSelectedTasks } from '../../../../../store/actions/board.actions'

export function GroupTableHeaders({
  columns,
  onUpdateColumn,
  boardId,
  group,
  onDeleteColumn,
  onAddColumn,
}) {
  const checkedTaskIds = useSelector(
    (storeState) => storeState.boardModule.checkedTaskIds
  )

  const handleGroupCheckboxChange = (event) => {
    const { checked } = event.target
    const allTaskIds = group.tasks.map((task) => task.id)

    const updatedTasks = checked
      ? [...checkedTaskIds, ...allTaskIds]
      : checkedTaskIds.filter((id) => !allTaskIds.includes(id))

    saveSelectedTasks(updatedTasks)
    return updatedTasks
  }

  return (
    <div className="table-body-row table-header">
      <div
        style={{ '--before-color': group.style.color }}
        className="first-column group-table-header-cell checkbox-cell flex align-center justify-center first-row-cell"
      >
        <input type="checkbox" onChange={handleGroupCheckboxChange} />
      </div>
      {columns.map((column, idx) => (
        <div
          key={column.id}
          className={`group-table-header-cell wrapper th-header flex align-center justify-center pad8 ${column.cmp.type}`}
        >
          {idx !== 0 ? (
            <EditableText
              type={'columnTitle'}
              initialText={column.Header}
              onSave={(text) => {
                onUpdateColumn(boardId, column.cmp.id, column.cmp, text)
              }}
            />
          ) : (
            <span>{column.Header}</span>
          )}
          <ContextBtn
            type="column"
            onDeleteColumn={() => onDeleteColumn(boardId, column.cmp.id)}
          />
        </div>
      ))}
      <div className="group-table-header-cell wrapper grid th-header pad8x ">
        <AddColumnBtn onAddColumn={(type) => onAddColumn(boardId, type)} />
      </div>
    </div>
  )
}
