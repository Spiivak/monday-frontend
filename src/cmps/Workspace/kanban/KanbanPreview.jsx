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
      return statusPickersWithTasks.map((current, index) => {
        const { statusPickerLabels, statusPerPicker } = current;
        return (
          <div key={index} className='flex gap16'>
            {statusPickerLabels.map((label, index) => {
              return (
              <div className="board-section">

              <div style={{backgroundColor: label.color}} className='label flex align-center justify-center'>
                {label.title}
              </div>

              <div className="task-container">
              {Object.entries(statusPerPicker).map(([key, value]) => {
                if(key !== label.id) return
                {console.log('KEYSSSSSS', key, value)}
                return value.map((task, idx) => {
                  return (
                  <div className='card-container'>
                    <div className="task-card">
                    <span>{task.title}</span>  
                    </div>
                  </div>
                  )
                })
              })}
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
  
  return (
    <section className="kanban-section">
      <div className="kanban-header">
        <BoardHeader />
      </div>
      <main>
        <div className="group-container">
          <div className="group-tasks flex gap16">
            {/* Render here labels */}
            {renderLabels()}
          </div>
        </div>
      </main>
    </section>
  )
}
