import React, { useState } from 'react'
import { DynamicTableCell } from './DynamicTableCell'
import { addTask, removeGroup, updateTask } from '../../store/actions/board.actions'
import { useParams } from 'react-router-dom'
import { AddSmallIcon } from '../Icons'
import { ContextBtn } from '../ContextBtn'
export function BoardViewGroup({ group, boardId, cmpsOrder }) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function onTaskUpdate(cmpType, data, task) {
    updateTask(boardId, group.id, task.id, cmpType, task, data)
  }

  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  function handleChange(ev) {
    const value = ev.target.value
    setNewTaskTitle(value)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const newTask = { title: newTaskTitle }
    addTask(boardId, group.id, newTask)
    setNewTaskTitle('')
  }

  return (
    <section className="board-view-group">
      <h2 className="group-title flex gap8">
        <ContextBtn type="group" onDeleteGroup={onDeleteGroup} /> {group.title}{' '}
        <span>{group.tasks.length} items / 0 subitems</span>
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
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={handleChange}
                    placeholder={`Add item`}
                  />
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
