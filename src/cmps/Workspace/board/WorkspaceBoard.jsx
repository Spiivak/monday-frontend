import { BoardGroupList } from './groups/BoardGroupList'

import { BoardHeader } from './header/BoardHeader'
import { useEffect, useState } from 'react'
import { addGroup, saveBoard } from '../../../store/actions/board.actions'
import { useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router'
import { MondayLoader } from '../MondayLoader'
export function WorkSpaceBoard() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [filteredBoard, setFilteredBoard] = useState(null)
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
  const boardLoading = useSelector(
    (storeState) => storeState.boardModule.boardLoading
  )
  const { boardId } = useParams()

  // useEffect(() => {
  // loadBoards()
  // loadUsers()
  // }, [])

  useEffect(() => {
    if (boardId) {
      setSelectedBoard(boards.find((board) => board._id === boardId))
      setFilteredBoard(boards.find((board) => board._id === boardId))
    } else {
      setSelectedBoard(boards[0])
      setFilteredBoard(boards[0])
    }
  }, [boardId, boards])

  useEffect(() => {
    if (filteredBoard) {
      let newFilteredBoard = { ...selectedBoard }
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')

        newFilteredBoard = {
          ...newFilteredBoard,
          groups: newFilteredBoard.groups
            .map((group) => {
              const filteredTasks = group.tasks.filter((task) => {
                return regExp.test(task.title)
              })


              return filteredTasks.length > 0
                ? { ...group, tasks: filteredTasks }
                : null
            })
            .filter(Boolean),
        }
      }
      if (filterBy.person) {
        const memberKeys = newFilteredBoard.cmpsOrder.reduce((acc, cmp) => {
          if (cmp.type === 'MemberPicker') return [...acc, 'members' + cmp.id]
          return acc
        }, [])

        newFilteredBoard = {
          ...newFilteredBoard,
          groups: newFilteredBoard.groups
            .map((group) => {
              const filteredTasks = group.tasks.filter((task) => {
                return memberKeys.some((memberKey) => {
                  if (task[memberKey]) {
                    return task[memberKey].some((member) => {
                      return member._id === filterBy.person._id
                    })
                  }
                  return false
                })
              })
              return filteredTasks.length > 0
                ? { ...group, tasks: filteredTasks }
                : null
            })
            .filter(Boolean),
        }
      }
      setFilteredBoard(newFilteredBoard)
    }
  }, [filterBy])

  async function onUpdateBoard(boardId) {
    try {
      await saveBoard(boardId)
    } catch (err) {
      console.log('Cannot add board', err)
    }
  }

  //TODO add user to own the added group
  function onAddGroup(boardId) {
    addGroup(boardId)
  }

  return (
    <>
      <section className="work-space-board">
        <div className="workspace-board-header">
          <BoardHeader board={selectedBoard} {...{ onUpdateBoard }} />
        </div>
        <div className="table-section">
          {!!boards && (
            <BoardGroupList board={filteredBoard} onAddGroup={onAddGroup} />
          )}
        </div>
      </section>
      {boardLoading && <MondayLoader />}
    </>
  )
}
