import { boardService } from '../../services/board.service'

import {
  ADD_BOARD,
  ADD_GROUP,
  ADD_TASK,
  REMOVE_BOARD,
  REMOVE_COLUMN,
  REMOVE_GROUP,
  REMOVE_TASK,
  SET_BOARDS,
  SET_IS_LOADING,
  UPDATE_BOARD,
  UPDATE_TASK,
} from '../reducers/board.reducer'
import { GET_BOARD_BY_ID } from '../reducers/board.reducer'

import { store } from '../store'

// * BOARD CRUD

export async function loadBoards() {
  try {
    const boards = await boardService.query()
    store.dispatch({ type: SET_BOARDS, boards })
    return boards
  } catch (err) {
    console.error('board action -> cannot load boards', err)
    throw err
  }
}

export async function removeBoard(boardId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    await boardService.remove(boardId)
    store.dispatch({ type: REMOVE_BOARD, boardId })
  } catch (err) {
    console.error('board action -> cannot remove board', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

// export async function addBoard(user) {
//   const board = boardService.getEmptyBoard()
//   try {
//     const savedBoard = await boardService.save(board)
//     store.dispatch({ type: ADD_BOARD, savedBoard })
//   } catch (err) {}
// }

// * GROUP CRUD

export async function addGroup(boardId) {
  const group = boardService.getEmptyGroup()
  try {
    const savedGroup = await boardService.addGroup(boardId, group)
    store.dispatch({ type: ADD_GROUP, boardId, savedGroup })
  } catch (err) {}
}

export async function removeGroup(boardId, groupId) {
  try {
    const deletedGroupId = await boardService.removeGroup(boardId, groupId)
    store.dispatch({ type: REMOVE_GROUP, boardId, deletedGroupId })
  } catch (err) {}
}

// * TASK CRUD

export async function updateTask(
  boardId,
  groupId,
  taskId,
  cmpType,
  cmpId,
  task,
  data
) {
  let newTask
  switch (cmpType) {
    case 'task':
      newTask = { ...task, title: data }
      break
    case 'StatusPicker':
      newTask = { ...task, ['status' + cmpId]: data }
      break
    case 'DatePicker':
      console.log(task)
      console.log(data)
      newTask = { ...task, ['date' + cmpId]: data }
      console.log('newTask:', newTask)
      break
    case 'DescriptionPicker':
      newTask = { ...task, ['description' + cmpId]: data }
      break
    case 'TimeLinePicker':
      newTask = { ...task, ['timeline' + cmpId]: data }
      break
    case 'FilePicker':
      newTask = { ...task, ['file' + cmpId]: data }
      break
    case 'MemberPicker':
      const existingMembers = task['members' + cmpId]
      const updatedMembers = Array.isArray(existingMembers)
        ? existingMembers.some((member) => member._id === data._id)
          ? existingMembers.filter((member) => member._id !== data._id)
          : [...existingMembers, data]
        : [data]
      newTask = {
        ...task,
        ['members' + cmpId]: updatedMembers,
      }
      console.log('newTask:', newTask)
      break
  }
  try {
    const task = await boardService.updateTask(
      boardId,
      groupId,
      taskId,
      newTask
    )
    store.dispatch({ type: UPDATE_TASK, boardId, groupId, taskId, task })
  } catch (err) {}
}

export async function addTask(boardId, groupId, newTaskTxt) {
  try {
    const task = await boardService.addTask(boardId, groupId, newTaskTxt)
    console.log(task)
    store.dispatch({ type: ADD_TASK, boardId, groupId, task })
  } catch (err) {}
}

export async function removeTask(boardId, groupId, taskId) {
  try {
    const deletedTaskId = await boardService.removeTask(
      boardId,
      groupId,
      taskId
    )
    store.dispatch({ type: REMOVE_TASK, boardId, groupId, deletedTaskId })
  } catch (err) {}
}

// * COLUMN CRUD

export async function removeColumn(boardId, columnId) {
  try {
    const deletedColumnId = await boardService.removeColumn(boardId, columnId)
    store.dispatch({ type: REMOVE_COLUMN, boardId, deletedColumnId })
  } catch (err) {}
}

export async function updateColumn(boardId, columnId, column) {
  try {
    const updatedColumn = await boardService.updateColumn(
      boardId,
      columnId,
      column
    )
    store.dispatch({ type: UPDATE_COLUMN, boardId, columnId, updatedColumn })
  } catch (err) {}
}

export async function saveBoard(board) {
  const type = board._id ? UPDATE_BOARD : ADD_BOARD
  const errType = board._id ? 'update' : 'add'
  try {
    const boardToSave = await boardService.save(board)
    store.dispatch({ type, board: boardToSave })
  } catch (err) {
    console.error(`board action -> cannot ${errType}`, err)
    throw err
  }
}

// export async function addBoardMsg(boardId,msg,user){
//   const newMsg = {...boardService.getEmptyMsg(), content:msg}
//   if(user) newMsg.owner = user
//   try {
//     const savedMsg = await boardService.addMsg(boardId, newMsg)
//     return savedMsg
//   } catch (err) {
//     console.error(`board action -> cannot save Msg`, err)
//   }
// }

// export function setFilter(filterBy) {
//   store.dispatch({ type: SET_FILTER, filterBy })
// }

// export function setSort(sortBy) {
//   store.dispatch({ type: SET_SORT, sortBy })
// }

// export function setOwner(userId){
//   store.dispatch({ type: SET_OWNER, owner: userId})
// }

// export function setPage(page){
//   store.dispatch({ type: SET_PAGE, page: page })
// }
