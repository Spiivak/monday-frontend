import { boardService } from '../../services/board.service'
import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'

import {
  ADD_BOARD,
  ADD_COLUMN,
  ADD_GROUP,
  ADD_TASK,
  COMPLETE_ADD_COLUMN,
  DEACTIVATE_BOARD,
  DEACTIVATE_CONTEXT_BTN,
  DEACTIVATE_TASK,
  REMOVE_BOARD,
  REMOVE_COLUMN,
  REMOVE_GROUP,
  REMOVE_TASK,
  SET_ACTIVE_BOARD,
  SET_ACTIVE_CONTEXT_BTN,
  SET_ACTIVE_TASK,
  SET_BOARD,
  SET_BOARDS,
  SET_CHECKED_TASKS,
  SET_EDIT_LABELS_TARGET,
  SET_FILTER_BY,
  SET_IMG_TARGET,
  SET_IS_BOARD_LOADING,
  SET_IS_LOADING,
  SET_TASKS,
  START_ADD_COLUMN,
  UPDATE_BOARD,
  UPDATE_COLUMN,
  UPDATE_GROUP,
  UPDATE_TASK,
} from '../reducers/board.reducer'
import { GET_BOARD_BY_ID } from '../reducers/board.reducer'

import { store } from '../store'

// * BOARD CRUD

export async function loadBoards() {
  store.dispatch({ type: SET_IS_BOARD_LOADING, boardLoading: true })
  try {
    const boards = await boardService.query()
    store.dispatch({ type: SET_BOARDS, boards })
    return boards
  } catch (err) {
    console.error('board action -> cannot load boards', err)
    throw err
  }
}

export async function loadBoard(boardId) {
  try {
    const board = await boardService.getById(boardId)
    store.dispatch({ type: SET_BOARD, board })
  } catch (err) {
    console.error('board action -> cannot load board', err)
  }
}

export async function saveBoard(board) {
  const type = board._id ? UPDATE_BOARD : ADD_BOARD
  const errType = board._id ? 'update' : 'add'
  try {
    const boardToSave = await boardService.save(board)
    console.log('saveBoard', boardToSave)
    store.dispatch({ type, board: boardToSave })
    return boardToSave
  } catch (err) {
    console.error(`board action -> cannot ${errType}`, err)
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

export async function updateBoards(boards) {
  try {
    store.dispatch({ type: SET_BOARDS, boards: boards })
    const updatedBoards = await boardService.updateBoards(boards)
  } catch (err) {
    console.error('board action -> cannot load boards', err)
    throw err
  }
}

export function setStoreFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
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

export async function updateGroup(boardId, groupId, group) {
  const updatedGroup = await boardService.updateGroup(boardId, groupId, group)
  store.dispatch({ type: UPDATE_GROUP, boardId, groupId, updatedGroup })
  try {
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
    case 'Activity':
      newTask = {
        ...task,
        ['activity']: task.activity ? [data, ...task.activity] : [data],
      }
      break
    case 'StatusPicker':
      newTask = { ...task, ['status' + cmpId]: data }
      break
    case 'DatePicker':
      newTask = { ...task, ['date' + cmpId]: data }
      break
    case 'DescriptionPicker':
      newTask = { ...task, ['description' + cmpId]: data }
      break
    case 'TimelinePicker':
      newTask = { ...task, ['timeline' + cmpId]: data }
      break
    case 'FilePicker':
      newTask = { ...task, ['file' + cmpId]: data }
      break
    case 'NumbersPicker':
      newTask = { ...task, ['number' + cmpId]: data }
      break
    case 'MemberPicker':
      newTask = { ...task, ['members' + cmpId]: data }
      break
    default:
      newTask = { ...task }
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
  } catch (err) {
    console.error(err)
  }
}

export async function addTask(boardId, groupId, newTaskTxt, at = 'last') {
  try {
    const task = await boardService.addTask(boardId, groupId, newTaskTxt, at)
    store.dispatch({ type: ADD_TASK, boardId, groupId, task, at })
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
    return taskId
  } catch (err) {}
}

export async function updateTasks(boardId, groupId, tasks) {
  try {
    store.dispatch({ type: SET_TASKS, boardId, groupId, tasks })
    const updatedTasks = await boardService.updateTasks(boardId, groupId, tasks)
    console.log(updatedTasks)
  } catch (err) {}
}

export async function removeAllTasks(props) {
  try {
    // Assuming each object in the array has properties boardId, groupId, and taskId
    const removedTaskIds = await Promise.all(
      props.map(async ({ boardId, groupId, taskId }) => {
        store.dispatch({ type: SET_CHECKED_TASKS, taskIds: [] })
        return await removeTask(boardId, groupId, taskId)
      })
    )
  } catch (err) {
    console.error('Error removing all tasks:', err)
  }
}

export async function saveSelectedTasks(taskIds) {
  try {
    store.dispatch({ type: SET_CHECKED_TASKS, taskIds })
  } catch (error) {
    console.error('Error saving selected tasks:', error)
  }
}

export async function resetSelectedTasks() {
  try {
    // Dispatch the action to reset the selected tasks
    store.dispatch({ type: SET_CHECKED_TASKS, taskIds: [] })
  } catch (error) {
    console.error('Error resetting selected tasks:', error)
  }
}

// * COLUMN CRUD

export async function addColumn(boardId, type, board) {
  let newColumn
  switch (type) {
    case 'numbers':
      newColumn = {
        title: 'Numbers',
        type: 'NumbersPicker',
      }
      break
    case 'timeline':
      newColumn = {
        title: 'Timeline',
        type: 'TimelinePicker',
      }
      break
    case 'people':
      newColumn = {
        title: 'Member',
        type: 'MemberPicker',
      }

      break
    case 'date':
      newColumn = {
        title: 'Date',
        type: 'DatePicker',
      }

      break
    case 'status':
      newColumn = {
        title: 'Status',
        type: 'StatusPicker',
      }

      break
    case 'file':
      newColumn = {
        title: 'File',
        type: 'FilePicker',
      }
      break
    case 'description':
      newColumn = {
        title: 'Description',
        type: 'DescriptionPicker',
      }
      break

    default:
      break
  }

  try {
    const addedColumn = await boardService.addColumn(boardId, newColumn)
    if (addedColumn.type === 'StatusPicker') {
      const labelsMap = {
        ['labels' + addedColumn.id]: boardService.defaultLabels(),
      }
      const newBoard = {
        ...board,
        ...labelsMap,
        cmpsOrder: [...board.cmpsOrder, addedColumn],
      }
      const boardToSave = await boardService.save(newBoard)
      store.dispatch({ type: SET_BOARD, board: boardToSave })
    } else {
      store.dispatch({ type: ADD_COLUMN, boardId, addedColumn })
    }
    store.dispatch({ type: START_ADD_COLUMN })
  } catch (err) {}
}

export async function removeColumn(boardId, columnId) {
  try {
    const deletedColumnId = await boardService.removeColumn(boardId, columnId)
    store.dispatch({ type: REMOVE_COLUMN, boardId, deletedColumnId })
    store.dispatch({ type: START_ADD_COLUMN })
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
    store.dispatch({ type: START_ADD_COLUMN })
  } catch (err) {}
}

// * CONTEXT MENU MODALS

export function setActiveContextBtn(contextBtn, contextBtnData) {
  store.dispatch({ type: SET_ACTIVE_CONTEXT_BTN, contextBtn, contextBtnData })
}

export function deactivateContextBtn() {
  store.dispatch({ type: DEACTIVATE_CONTEXT_BTN })
}

// * ACTIVE TASK

export function setActiveTask(activeTask, activeGroup) {
  store.dispatch({ type: SET_ACTIVE_TASK, activeTask, activeGroup,  })
}

export function deactivateTask() {
  store.dispatch({ type: DEACTIVATE_TASK })
}

// *

// * ACTIVE BOARD

export function setActiveBoard(activeBoard) {
  store.dispatch({ type: SET_ACTIVE_BOARD, activeBoard })
}

export function deactivateBoard() {
  store.dispatch({ type: DEACTIVATE_BOARD })
}

// *

export function finishAddingColumn() {
  store.dispatch({ type: COMPLETE_ADD_COLUMN })
}

export function setBoardLoading(type) {
  store.dispatch({ type: SET_IS_BOARD_LOADING, boardLoading: type })
}

export function setImg(imgTarget, imgTargetData) {
  store.dispatch({ type: SET_IMG_TARGET, imgTarget, imgTargetData })
}

export function setLabels(editLabelTarget, editLabelTargetData) {
  store.dispatch({
    type: SET_EDIT_LABELS_TARGET,
    editLabelTarget,
    editLabelTargetData,
  })
}

export function labelChange(type, data, board, labelId, accessor) {
  console.log(type, data, board, labelId, accessor)
  const newBoard = {
    ...board,
    [accessor]: board[accessor].map((label) => {
      if (label.id !== labelId) return label
      console.log({ ...label, [type]: data })
      return { ...label, [type]: data }
    }),
  }
  console.log(newBoard.groups[0].tasks[0])
  saveBoard(newBoard)
}
export function addLabel(data, board, accessor) {
  const newLabel = { id: utilService.makeId(), title: data, color: '#eee' }
  const newBoard = {
    ...board,
    [accessor]: [...board[accessor], newLabel],
  }

  saveBoard(newBoard)
}

export function swapLabels(labels, board, accessor) {
  const newBoard = { ...board, [accessor]: [...labels] }

  saveBoard(newBoard)
}

export function removeLabel(board, labelId, accessor) {
  const newBoard = {
    ...board,
    [accessor]: board[accessor].filter((label) => {
      return label.id !== labelId
    }),
  }
  saveBoard(newBoard)
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
