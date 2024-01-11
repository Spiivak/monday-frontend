import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DynamicTableCell } from '../DynamicTableCell'
import { ContextBtn } from '../../../../ContextBtn'

export const SortableRow = ({
  row,
  rowIdx,
  group,
  onTaskUpdate,
  onDeleteTask,
  cmpsOrder,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: row.id,
    })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
      }}
      {...attributes}
      {...listeners}
      className="table-body-row">
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
        <input type="checkbox" />
      </div>
      {columns.map((column, colIdx) => (
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
      ))}
    </div>
  )
}
