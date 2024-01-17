import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadBoards, saveBoard } from '../../../store/actions/board.actions'
import { BoardHeader } from '../board/header/BoardHeader'

export function ChartPreview() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const selectedBoard = boards.find((board) => board._id === boardId)

  useEffect(() => {
    loadBoards()
  }, [])
  async function onUpdateBoard(boardToUpdate) {
    try {
      await saveBoard(boardToUpdate)
    } catch (err) {
      console.error('Cannot update board', err)
    }
  }

  function getTasks() {
    const tasks = selectedBoard.groups.reduce((acc, group) => {
      return [...acc, ...group.tasks]
    }, [])
    return tasks
  }
  function getCmps() {
    const cmps = selectedBoard.cmpsOrder.reduce((acc, cmp) => {
      switch (cmp.type) {
        case 'StatusPicker':
          return [
            ...acc,
            {
              type: 'status',
              accessor: 'status' + cmp.id,
              labels: 'labels' + cmp.id,
            },
          ]
        case 'DatePicker':
          return [...acc, { type: 'date', accessor: 'date' + cmp.id }]
        case 'DescriptionPicker':
          return [
            ...acc,
            { type: 'description', accessor: 'description' + cmp.id },
          ]
        case 'TimelinePicker':
          return [...acc, { type: 'timeline', accessor: 'timeline' + cmp.id }]
        case 'FilePicker':
          return [...acc, { type: 'file', accessor: 'file' + cmp.id }]
        case 'NumbersPicker':
          return [...acc, { type: 'number', accessor: 'number' + cmp.id }]
        case 'MemberPicker':
          return [...acc, { type: 'members', accessor: 'members' + cmp.id }]
        default:
          return acc
      }
    }, [])
    return cmps
  }
  function countLabels() {
    const statusCmps = getCmps().filter((cmp) => cmp.type === 'status')
    const labelGroups = statusCmps.map((cmp) => {
      const currLabels = [...selectedBoard[cmp.labels]]
      currLabels.forEach((label) => (label.accessor = cmp.accessor))
      return [...currLabels]
    })
    const tasks = getTasks()
    const idCounts = {}

    tasks.forEach((task) => {
      statusCmps.forEach((cmp) => {
        const accessor = cmp.accessor
        const labelId = task[accessor]
        if (!idCounts[accessor]) {
          idCounts[accessor] = {}
        }
        idCounts[accessor][labelId] = (idCounts[accessor][labelId] || 0) + 1
      })
    })

    const resultObject = {}
    labelGroups.forEach((labels) => {
      labels.forEach((label) => {
        const accessor = label.accessor
        const id = label.id
        const title = label.title
        const color = label.color
        const count =
          idCounts[accessor] && idCounts[accessor][id]
            ? idCounts[accessor][id]
            : 0
        if (!resultObject[accessor]) {
          resultObject[accessor] = []
        }
        resultObject[accessor].push({ title, color, count })
      })
    })
    return Object.keys(resultObject).forEach((accessor) => {
      const labels = resultObject[accessor];

      // Generate div elements for each label
      const divElements = labels.map(generateDiv).join('\n');

      // Log or use the divElements as needed
      console.log(`Accessor: ${accessor}`);
      console.log(divElements);
      console.log('\n');
    });
  }

  function generateDiv(label) {
    return `<div style="background-color: ${label.color}">${label.title} - ${label.count}</div>`;
  }

  // Iterate through resultObject


  if (!boards) return <></>
  return (
    <section className="kanban-section">
      <BoardHeader board={selectedBoard} {...{ onUpdateBoard }} />
      <main>
        <div className="group-container">
          {console.log(boards)}
          {countLabels()}
        </div>
      </main>
    </section>
  )
}
