import React, { useEffect, useState } from 'react'
import { DynamicTableCell } from './DynamicTableCell'
import {
  addColumn,
  addTask,
  removeColumn,
  removeGroup,
  removeTask,
  updateColumn,
  updateTask,
} from '../../store/actions/board.actions'
import { ContextBtn } from '../ContextBtn'
import { EditableText } from '../EditableText'
import AddColumnBtn from './Columns/AddColumnBtn'
import { DnDApp } from './DnDCmps/DnDApp'
export function BoardViewGroup({ group, boardId, cmpsOrder }) {
  const [columnHeaders, setColumnHeaders] = useState([])
  const [taskRows, setTaskRows] = useState([])

  useEffect(() => {
    setColumnHeaders(cmpsOrder)
    setTaskRows(group.tasks)
  }, [cmpsOrder, group])

  // * TASK
  function onTaskUpdate(cmpType, cmpId, data, task) {
    updateTask(boardId, group.id, task.id, cmpType, cmpId, task, data)
  }

  function onDeleteTask(boardId, groupId, taskId) {
    removeTask(boardId, groupId, taskId)
  }

  function saveNewTask(title) {
    const newTask = { title }
    addTask(boardId, group.id, newTask)
    setNewTaskTitle('')
  }

  // * COLUMN
  function onDeleteColumn(boardId, cmpId) {
    removeColumn(boardId, cmpId)
  }

  function onUpdateColumn(boardId, columnId, column, data) {
    const columnToUpdate = { ...column, title: data }
    updateColumn(boardId, columnId, columnToUpdate)
  }

  function onAddColumn(boardId, type) {
    addColumn(boardId, type)
  }

  // * GROUP
  function onDeleteGroup() {
    removeGroup(boardId, group.id)
  }

  if(!group) return <>hi</>
  return (
    <DnDApp {...{group, boardId, cmpsOrder}} />
    // <section className="board-view-group">
    //   <h2 className="group-title flex gap8">
    //     <ContextBtn type="group" onDeleteGroup={onDeleteGroup} /> {group.title}{' '}
    //     <span>{group.tasks.length} items / 0 subitems</span>
    //   </h2>
    //   <div>
    //     <table>
    //       <thead>
    //         <tr style={{}}>
    //           <th style={{ width: '80px' }}>
    //             <div className="flex align-center justify-center">
    //               <input type="checkbox" />
    //             </div>
    //           </th>
    //           <th>task</th>
    //           {columnHeaders.map((columnHeader, idx) => (
    //             <th key={idx}>
    //               <div className="flex align-center space-between hoverable">
    //                 <EditableText
    //                   initialText={columnHeader.title}
    //                   onSave={(text) => {
    //                     onUpdateColumn(
    //                       boardId,
    //                       columnHeader.id,
    //                       columnHeader,
    //                       text
    //                     )
    //                   }}
    //                 />
    //                 <ContextBtn
    //                   type="column"
    //                   onDeleteColumn={() =>
    //                     onDeleteColumn(boardId, columnHeader.id)
    //                   }
    //                 />
    //               </div>
    //             </th>
    //           ))}
    //           <th style={{ width: '80px' }}>
    //             <AddColumnBtn
    //               onAddColumn={(type) => onAddColumn(boardId, type)}
    //             />
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {taskRows.map((task) => (
    //           <tr key={task.id} className="hoverable">
    //             <td style={{ width: '80px' }}>
    //               <div className="flex align-center justify-center relative ">
    //                 <div className="row-context absolute">
    //                   <ContextBtn
    //                     type="row"
    //                     onDeleteRow={() =>
    //                       onDeleteTask(boardId, group.id, task.id)
    //                     }
    //                   />
    //                 </div>
    //                 <input type="checkbox" />
    //               </div>
    //             </td>
    //             <td>
    //               <EditableText
    //                 initialText={task.title}
    //                 onSave={(text) => onTaskUpdate('task', '', text, task)}
    //               />
    //             </td>
    //             {columnHeaders.map((columnHeader, idx) => (
    //               <td key={idx}>
    //                 <DynamicTableCell
    //                   cmp={columnHeader.type}
    //                   cmpId={columnHeader.id}
    //                   onTaskUpdate={onTaskUpdate}
    //                   task={task}
    //                 />
    //               </td>
    //             ))}
    //             <td style={{ width: '80px' }}> </td>
    //           </tr>
    //         ))}
    //         <tr>
    //           <td style={{ width: '80px' }}>
    //             <div className="flex align-center justify-center">
    //               <input type="checkbox" />
    //             </div>
    //           </td>
    //           <td colSpan={columnHeaders.length + 2}>
    //             <EditableText initialText={'Add item'} onSave={saveNewTask} />
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </section>
  )
}
