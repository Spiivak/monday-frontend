import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DynamicTableCell } from '../DynamicTableCell'
import { ContextBtn } from '../../ContextBtn'

export function SortableItem({ id, row, onTaskUpdate, onDeleteTask, boardId, groupId }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr className="hoverable" ref={setNodeRef} style={style} {...attributes}>
      <td style={{ width: '80px' }}>
        <div className="flex align-center justify-center relative ">
          <div style={{ cursor: 'grab' }} className="row-context absolute">
            <ContextBtn
              type="row"
              onDeleteRow={() =>
                onDeleteTask(boardId, groupId, row.original.id)
              }
            />
          </div>
          <input type="checkbox" {...listeners} />
        </div>
      </td>
      {row.cells.map((cell) => (
        <td {...cell.getCellProps()}>
          <DynamicTableCell
            cmp={cell.column.cmp.type}
            cmpId={cell.column.cmp.id}
            onTaskUpdate={onTaskUpdate}
            task={cell.row.original}
          />
        </td>
      ))}
      <td> </td>
    </tr>
  )
}
