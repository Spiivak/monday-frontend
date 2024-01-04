import React, { useState } from 'react'
import { DynamicTableCell } from './DynamicTableCell'
import { handleAddTask, handleUpdateTask } from '../../store/actions/board.actions'
import { useParams } from 'react-router-dom'
import { AddSmallIcon } from '../Icons'
export function BoardViewGroup({ group, cmpsOrder }) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  function onTaskUpdate(cmpType, data, task) {
    // const { boardId } = useParams()
    const boardId = 'b101'
    handleUpdateTask(boardId, group.id, task.id, cmpType, task, data)
  }
  function handleChange(ev){
    const value = ev.target.value
    setNewTaskTitle(value)
  }
  function handleSubmit(ev) {
    ev.preventDefault()
    const boardId = 'b101'
    const newTask = {title: newTaskTitle}
    handleAddTask(boardId, group.id, newTask)
    setNewTaskTitle('')
  }
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
                  <DynamicTableCell
                    cmp={cmp}
                    task={task}
                    onTaskUpdate={onTaskUpdate}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={cmpsOrder.length + 1}>
              <div className="input-wrapper">
                <div className="icon-wrapper">
                  <AddSmallIcon />
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <input type="text" value={newTaskTitle} onChange={handleChange} placeholder={`Add item`} />
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
