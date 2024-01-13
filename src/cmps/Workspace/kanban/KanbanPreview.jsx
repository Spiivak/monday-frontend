import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BoardHeader } from '../board/header/BoardHeader'
import { PersonRoundedIcon } from '../../Icons'
import { loadBoards } from '../../../store/actions/board.actions'
import { useParams } from 'react-router'

export function KanbanPreview() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [statusPickerCmp, setStatusPickerCmp] = useState(null)

  useEffect(() => {
    loadBoards()
  }, [])
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const currBoard = await boards.find((board) => board._id === boardId)
        console.log('fetchBoard  currBoard:', currBoard)
        setSelectedBoard(currBoard)
      } catch (error) {
        console.error('Error fetching board:', error)
      }
    }

    fetchBoard()
  }, [boards, boardId])

  function getCmpsOrder() {
    if (!selectedBoard || !selectedBoard.cmpsOrder) {
      console.error(
        'selectedBoard or selectedBoard.cmpsOrder is null or undefined'
      )
      return []
    }

    return Object.values(selectedBoard.cmpsOrder)
      .filter((cmp) => cmp.type === 'StatusPicker')
      .map((statusPicker) => ({
        type: statusPicker.type,
        id: statusPicker.id,
      }))
  }

  const renderLabels = () => {
    // const uniqueStatuses = new Set();

    if (selectedBoard) {
      const statusPickers = selectedBoard.cmpsOrder.reduce((acc, cmp) => {
        if (cmp.type !== 'StatusPicker') return acc
        return [...acc, cmp]
      }, [])

      const statusPickersWithTasks = statusPickers.map((statusPicker) => {
        const statusPickerLabels = selectedBoard['labels' + statusPicker.id]
        const statusPerPicker = selectedBoard.groups.reduce((acc, group) => {
          group.tasks.forEach((task) => {
            if (task['status' + statusPicker.id]) {
              if (acc[task[['status' + statusPicker.id]]]) {
                acc[task['status' + statusPicker.id]].push(task)
              } else {
                acc[task['status' + statusPicker.id]] = [task]
              }
            } else {
              if (acc["Haven't started"]) {
                acc["Haven't started"].push(task)
              } else {
                acc["Haven't started"] = [task]
              }
            }
          })
          return acc
        }, {})
        return { statusPickerLabels, statusPerPicker }
      })
      console.log(statusPickersWithTasks)

      // const statusPickerComponents = getCmpsOrder();
      // console.log('renderLabels  statusPickerComponents:', statusPickerComponents)

      // statusPickerComponents.forEach((statusPicker) => {
      //   const statusKey = `status${statusPicker.id}`;
      //   console.log('statusKey:', statusKey)

      //   Object.values(selectedBoard.groups).forEach((group) => {
      //     Object.values(group.tasks).forEach((task) => {
      //       const taskStatus = task[statusKey];

      //       // Check if taskStatus is not undefined or null before adding to the set
      //       if (taskStatus != null && !uniqueStatuses.has(taskStatus)) {
      //         uniqueStatuses.add(taskStatus)

      //         // Call getTasksByLabel here with the label
      //       }
      //     });
      //   });
      // });
    }

    // const uniqueStatusesArray = Array.from(uniqueStatuses)

    // return [uniqueStatusesArray]
  }

  // const getTasksByLabel = (label) => {
  //   const tasksByLabel = {}
  //   const statusPickerComponents = getCmpsOrder()

  //   statusPickerComponents.forEach((statusPicker) => {
  //     const statusKey = `status${statusPicker.id}`

  //     console.log('statusPickerComponents.forEach  statusKey:', statusKey)
  //     Object.values(selectedBoard.groups).forEach((group) => {
  //       Object.values(group.tasks).forEach((task) => {
  //         const taskStatusc1 = task[statusKey] || "Haven't Started"

  //         if (taskStatusc1 === label) {
  //           if (!tasksByLabel[label]) {
  //             tasksByLabel[label] = []
  //           }

  //           tasksByLabel[label].push(task)
  //         }
  //       })
  //     })
  //   })
  //   console.log('Object.values  tasksByLabel:', tasksByLabel)
  //   return tasksByLabel
  // }

  if (!selectedBoard || !selectedBoard.groups) {
    return <div>Loading...</div>
  }
  return (
    <section className="kanban-section">
      <div className="kanban-header">
        <BoardHeader />
      </div>
      <main>
        <div className="group-container">
          <div className="group-tasks flex gap16">
            {renderLabels()}
            {/* {renderLabels().map((label) => {
              console.log('KanbanPreview  label:', label)
              return (
                <div key={label} className={`label-container`}>
                  <div
                    className={`label ${label} flex align-center justify-center`}>
                    <h2>{label}</h2>
                  </div>
                  <div className="task-container">
                    <div className="card-container">
                      {getTasksByLabel(label)[label].map((task) => (
                        <div key={task.id} className="task-card">
                          <p>{task.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })} */}
          </div>
        </div>
      </main>
    </section>
  )
}
