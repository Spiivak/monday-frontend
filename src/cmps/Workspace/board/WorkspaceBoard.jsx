import { BoardGroupList } from './groups/BoardGroupList'

import { BoardHeader } from './header/BoardHeader'
import { useEffect, useState } from 'react'
import {
  addGroup,
  loadBoard,
  loadBoards,
  saveBoard,
  setBoardLoading,
} from '../../../store/actions/board.actions'
import { useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router'
import { MondayLoader } from '../MondayLoader'
import { BatchMenu } from './groups/table/BatchMenu'
import { socketService } from '../../../services/socket.service'
export function WorkSpaceBoard() {
  // const [selectedBoard, setSelectedBoard] = useState(null)
  // const [filteredBoard, setFilteredBoard] = useState(null)
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
  const { boardId } = useParams()
  console.log('workspaceboard - ',boardId)
  let filteredBoard = boards.find((board) => board._id === boardId)
  const selectedBoard = boards.find((board) => board._id === boardId)
  const boardLoading = useSelector(
    (storeState) => storeState.boardModule.boardLoading
  )

  useEffect(() => {
    if (boardId) {
      loadBoard(boardId)
    } else {
      loadBoard(boards[0]._id)
    }
  }, [boardId])

  useEffect(()=>{
    socketService.emit('workspace-set-board', boardId)
    return ()=>{
      socketService.emit('workspace-set-board', boardId)

    }
  },[boardId, boards])

  // useEffect(() => {
  //   if (boardId) {
  //     setSelectedBoard(boards.find((board) => board._id === boardId))
  //     setFilteredBoard(boards.find((board) => board._id === boardId))
  //   } else {
  //     setSelectedBoard(boards[0])
  //     setFilteredBoard(boards[0])
  //   }
  // }, [boardId, boards])

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
    filteredBoard = newFilteredBoard
  }

  async function onUpdateBoard(boardToUpdate) {
    try {
      await saveBoard(boardToUpdate)
    } catch (err) {
      console.error('Cannot add board', err)
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
            <>
              <BoardGroupList board={filteredBoard} onAddGroup={onAddGroup} />
              <BatchMenu />
            </>
          )}
        </div>
      </section>
      {boardLoading && <MondayLoader />}
    </>
  )
}
