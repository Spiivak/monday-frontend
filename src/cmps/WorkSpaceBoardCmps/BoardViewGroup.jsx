import React from 'react'
import { DynamicTableCell } from './DynamicTableCell'
export function BoardViewGroup({ group, cmpsOrder }) {
  return (
    <section className="board-view-group">
      <h2 className="group-title">
        {group.title} <span>{group.tasks.length} items / 0 subitems</span>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            {cmpsOrder.map((cmp, idx) => (
              <th key={idx}>{cmp}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {group.tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              {cmpsOrder.map((cmp, idx) => (
                <td key={idx}>
                  <DynamicTableCell cmp={cmp} group={group} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
