import { boardService } from '../../services/board.service.js'
//board
export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const GET_BOARD_BY_ID = 'GET_BOARD_BY_ID'
//groups
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
//tasks
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
//column
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
//loading
export const SET_IS_LOADING = 'SET_IS_LOADING'
//context-btns
export const SET_ACTIVE_CONTEXT_BTN = 'SET_ACTIVE_CONTEXT_BTN'
export const DEACTIVATE_CONTEXT_BTN = 'DEACTIVATE_CONTEXT_BTN'

const initialState = {
  boards: [],
  isLoading: false,
  activeContextBtn: null,
  activeContextBtnData: null
}

export function boardReducer(state = initialState, action = {}) {
  let boards
  let newBoards

  switch (action.type) {
    // * BOARDS CRUD
    case SET_BOARDS:
      return { ...state, boards: action.boards }

    case REMOVE_BOARD:
      boards = state.boards.filter((board) => board._id !== action.boardId)
      return { ...state, boards }

    case ADD_BOARD:
      boards = [...state.boards, action.board]
      return { ...state, boards }

    case UPDATE_BOARD:
      boards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      return { ...state, boards }
    // * GROUP CRUD
    case ADD_GROUP:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return { ...board, groups: [...board.groups, action.savedGroup] }
      })
      return { ...state, boards: newBoards }
    case REMOVE_GROUP:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          groups: board.groups.filter(
            (group) => group.id !== action.deletedGroupId
          ),
        }
      })
      return { ...state, boards: newBoards }
    // * TASK CRUD
    case UPDATE_TASK:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          groups: board.groups.map((group) => {
            if (group.id !== action.groupId) return group
            return {
              ...group,
              tasks: group.tasks.map((task) => {
                if (task.id !== action.taskId) return task
                return action.task
              }),
            }
          }),
        }
      })
      return { ...state, boards: newBoards }
    case ADD_TASK:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          groups: board.groups.map((group) => {
            if (group.id !== action.groupId) return group
            return { ...group, tasks: [...group.tasks, action.task] }
          }),
        }
      })
      return { ...state, boards: newBoards }

    case REMOVE_TASK:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          groups: board.groups.map((group) => {
            if (group.id !== action.groupId) return group
            return {
              ...group,
              tasks: group.tasks.filter(
                (task) => task.id !== action.deletedTaskId
              ),
            }
          }),
        }
      })
      return { ...state, boards: newBoards }
    case ADD_COLUMN:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          cmpsOrder: [...board.cmpsOrder, action.addedColumn],
        }
      })
      return { ...state, boards: newBoards }

    case REMOVE_COLUMN:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          cmpsOrder: board.cmpsOrder.filter(
            (cmp) => cmp.id !== action.deletedColumnId
          ),
        }
      })
      return { ...state, boards: newBoards }
    case UPDATE_COLUMN:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          cmpsOrder: board.cmpsOrder.map((cmp) => {
            if (cmp.id !== action.columnId) return cmp
            return action.updatedColumn
          }),
        }
      })
      return { ...state, boards: newBoards }

    // * LOADING
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    // * CONTEXT BTN
    case SET_ACTIVE_CONTEXT_BTN:
      return {...state, activeContextBtn: action.contextBtn, activeContextBtnData: action.contextBtnData }
      case DEACTIVATE_CONTEXT_BTN:
      return {...state, activeContextBtn: null, activeContextBtnData: null }
    default:
      return state
  }
}
