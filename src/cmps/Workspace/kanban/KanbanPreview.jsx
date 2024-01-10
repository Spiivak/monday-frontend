import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BoardHeader } from '../board/header/BoardHeader'
import { PersonRoundedIcon } from '../../Icons'

export default function KanbanPreview() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  console.log('KanbanPreview  boards:', boards)

  useEffect(() => {
  }, [boards])

  const renderLabels = () => {
    const uniqueStatuses = new Set()

    // const labelKeys = 

    boards.forEach((board) => {
      Object.values(board.groups).forEach((group) => {
        Object.values(group.tasks).forEach((task) => {
          const taskStatusc1 = task.statusc1

          if (taskStatusc1 != null && !uniqueStatuses.has(taskStatusc1)) {
            uniqueStatuses.add(taskStatusc1)
          }
        })
      })
    })

    const uniqueStatusesArray = Array.from(uniqueStatuses)
    console.log(uniqueStatusesArray)

    return uniqueStatusesArray
  }

  const getTasksByLabel = (label) => {
    const tasksArray = []

    boards.forEach((board) => {
      Object.values(board.groups).forEach((group) => {
        Object.values(group.tasks).forEach((task) => {
          const taskStatusc1 = task.statusc1

          if (taskStatusc1 === label) {
            tasksArray.push(task)
          }
        })
      })
    })

    return tasksArray
  }
  if (!boards || boards.length === 0) return <div>Loading...</div>
  return (
    <section className='kanban-section'>
      <div className="kanban-header">
      <BoardHeader />
      </div>
      <main>
        <div className='group-container'>
          <div className="group-tasks flex gap16">
            {renderLabels().map((label) => (
              <div key={label} className={`label-container`}>
                <div className={`label ${label} flex align-center justify-center`}>
                  <h2>{label}</h2>
                </div>
                <div className="task-container">

                  <div className='card-container'>
                    {getTasksByLabel(label).map((task) => (
                      <div key={task.id} className='task-card'>
                        <p>{task.title}</p>
                        <div className='members-container flex'>
                              <div className="person-title flex align-center gap8 btn-icon medium-transparent">
                                <PersonRoundedIcon/>
                                Person
                              </div>
                          {task.membersc2.map((member) => (
                            <div key={member._id} className='member-card flex'>
                              <picture><img src={member.imgUrl} alt={member.fullname} /></picture>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}