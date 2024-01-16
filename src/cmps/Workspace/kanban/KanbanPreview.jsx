import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BoardHeader } from '../board/header/BoardHeader'
import {
  ChatIcon,
  MenuIcon,
  PersonRoundedIcon,
  SubitemsIcon,
} from '../../Icons'
import { loadBoards, saveBoard } from '../../../store/actions/board.actions'
import { useParams } from 'react-router'
import { ToolTip } from '../../ToolTip'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export function KanbanPreview() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const [selectedBoard, setSelectedBoard] = useState(null)

  useEffect(() => {
    loadBoards()
  }, [])
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const currBoard = await boards.find((board) => board._id === boardId)
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

  const renderPersons = (task) => {
    if (selectedBoard) {
      const memberPicker = selectedBoard.cmpsOrder.reduce((acc, cmp) => {
        if (cmp.type !== 'MemberPicker') return acc
        return [...acc, cmp]
      }, [])
      if (
        !task['members' + memberPicker[0].id] ||
        task['members' + memberPicker[0].id].length === 0
      )
        return <PersonRoundedIcon />
      return task['members' + memberPicker[0].id].map((member) => {
        return (
          <img
            key={member._id}
            src={member.imgUrl}
            alt="member"
            style={{ width: '25px', height: '25px', borderRadius: '50%' }}
          />
        )
      })
    }
  }

  const handleDragEnd = (result) => {
    console.log('handleDragEnd  result:', result)
  }

  const renderLabels = () => {
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
      return statusPickersWithTasks.map((current, index) => {
        const { statusPickerLabels, statusPerPicker } = current
        return (
          <div key={index} className="flex gap16">
            {statusPickerLabels.map((label, index) => {
              return (
                <div key={index} className="board-section">
                  <div
                    style={{ backgroundColor: label.color }}
                    className="label flex align-center justify-center"
                  >
                    {label.title}
                  </div>
                  <div className="task-container">
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable
                        droppableId={`droppable-${label.id}`}
                        type="TASK"
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="card-container"
                          >
                            {Object.entries(statusPerPicker).map(
                              ([key, value]) => {
                                if (key !== label.id) return null
                                return value.map((task, idx) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={`draggable-${task.id}`}
                                    index={idx}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="card-container">
                                          <div className="task-card flex column">
                                            <div className="card-header flex space-between">
                                              <div className="card-title">
                                                <span>{task.title}</span>
                                              </div>
                                              <div className="card-actions flex gap8">
                                                <ChatIcon />
                                                <MenuIcon />
                                              </div>
                                            </div>
                                            <div className="task-people flex align-center space-between">
                                              <div className="people-title flex align-center">
                                                <span className="flex align-center">
                                                  <PersonRoundedIcon />
                                                </span>
                                                <span>Person</span>
                                              </div>
                                              <div className="persons flex align-center justify-center">
                                                {renderPersons(task)}
                                              </div>
                                            </div>
                                            <div className="task-subitem flex space-between align-center">
                                              <span className="flex align-center gap8">
                                                <SubitemsIcon />
                                              </span>
                                              <ToolTip title="Subitems">
                                                <span>Subitems</span>
                                              </ToolTip>
                                              <div className="subitem-actions flex align-center justify-center">
                                                <SubitemsIcon />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              }
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })
    }
  }
  if (!selectedBoard || !selectedBoard.groups) {
    return <div>Loading...</div>
  }
  async function onUpdateBoard(boardToUpdate) {
    try {
      await saveBoard(boardToUpdate)
    } catch (err) {
      console.error('Cannot add board', err)
    }
  }
  return (
    <section className="kanban-section">
      <BoardHeader board={selectedBoard} {...{ onUpdateBoard }} />
      <main>
        <div className="group-container">
          <div className="group-tasks flex gap16">{renderLabels()}</div>
        </div>
      </main>
    </section>
  )
}
