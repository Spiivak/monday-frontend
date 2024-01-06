import React, { useMemo } from 'react';
import { useTable, useDrag, useDrop } from 'react-table';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

export function DnDApp({ group, cmpsOrder }) {
  const getColumns = () => {
    return [
      { Header: 'Task', accessor: 'title', id: '0' },
      ...cmpsOrder.map((column) => ({
        Header: column.title,
        accessor: `${column.type}${column.id}`, // Adjusted the accessor format
        id: column.id,
      })),
    ];
  };

  const columns = useMemo(() => getColumns(), [cmpsOrder]);

  const data = useMemo(() => group.tasks, [group.tasks]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
    },
    useDrag,
    useDrop
  );

  const handleDrop = ({ over, active }) => {
    if (over && active) {
      const newOrder = arrayMove(columns, active.id, over.id);
      setColumnOrder(newOrder.map((col) => col.id));
    }
  };

  return (
    <table {...getTableProps()} className="your-table-class">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
