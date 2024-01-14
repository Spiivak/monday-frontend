//board
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const GET_BOARD_BY_ID = 'GET_BOARD_BY_ID'
//filter by
export const SET_FILTER_BY = 'SET_FILTER_BY'
//groups
export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
//tasks
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const SET_CHECKED_TASKS = 'SET_CHECKED_TASKS'
//column
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
//loading
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_IS_BOARD_LOADING = 'SET_IS_BOARD_LOADING'
//context-btns
export const SET_ACTIVE_CONTEXT_BTN = 'SET_ACTIVE_CONTEXT_BTN'
export const DEACTIVATE_CONTEXT_BTN = 'DEACTIVATE_CONTEXT_BTN'
// active task
export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK'
export const DEACTIVATE_TASK = 'DEACTIVATE_TASK'
//
export const START_ADD_COLUMN = 'START_ADD_COLUMN'
export const COMPLETE_ADD_COLUMN = 'COMPLETE_ADD_COLUMN'
// board members
export const SET_BOARD_MEMBERS = 'SET_BOARD_MEMBERS'

export const SET_IMG_TARGET = 'SET_IMG_TARGET'
export const SET_EDIT_LABELS_TARGET = 'SET_EDIT_LABELS_TARGET'

const initialState = {
  boards: [],
  selectedBoard: {},
  filterBy: {},
  boardLoading: false,
  isLoading: false,
  activeContextBtn: null,
  activeContextBtnData: null,
  activeTask: null,
  isAddingColumn: false,
  checkedTaskIds: [],
  imgTarget: null,
  imgTargetData: null,
  editLabelTarget: null,
  editLabelTargetData: null,
}

export function boardReducer(state = initialState, action = {}) {
  let newBoards
  let newCheckedTaskIds

  switch (action.type) {
    // * BOARDS CRUD
    case SET_BOARDS:
      return { ...state, boards: [...action.boards] }

    case SET_BOARD:
      newBoards = state.boards.map((board) => {
        return board._id !== action.board._id ? board : action.board
      })
      return { ...state, boards: [...newBoards], selectedBoard: action.board }

    case REMOVE_BOARD:
      newBoards = state.boards.filter((board) => board._id !== action.boardId)
      return { ...state, boards: [...newBoards] }

    case ADD_BOARD:
      newBoards = [...state.boards, action.board]
      return { ...state, boards: [...newBoards] }

    case UPDATE_BOARD:
      newBoards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      return { ...state, boards: [...newBoards] }

    // * GROUP CRUD
    case ADD_GROUP:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return { ...board, groups: [...board.groups, action.savedGroup] }
      })
      return { ...state, boards: [...newBoards] }

    case UPDATE_GROUP:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          groups: board.groups.map((group) => {
            if (group.id !== action.groupId) return group
            return action.updatedGroup
          }),
        }
      })
      return { ...state, boards: [...newBoards] }

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
      return { ...state, boards: [...newBoards] }

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
      return { ...state, boards: [...newBoards] }

    case SET_CHECKED_TASKS:
      return { ...state, checkedTaskIds: [...action.taskIds] }

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
      return { ...state, boards: [...newBoards] }

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
      return { ...state, boards: [...newBoards] }

    case ADD_COLUMN:
      newBoards = state.boards.map((board) => {
        if (board._id !== action.boardId) return board
        return {
          ...board,
          cmpsOrder: [...board.cmpsOrder, action.addedColumn],
        }
      })
      return { ...state, boards: [...newBoards] }

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
      return { ...state, boards: [...newBoards] }

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
      return { ...state, boards: [...newBoards] }

    //* FILTER BY

    case SET_FILTER_BY:
      return { ...state, filterBy: action.filterBy }

    // * LOADING
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_IS_BOARD_LOADING:
      return { ...state, boardLoading: action.boardLoading }

    // * CONTEXT BTN
    case SET_ACTIVE_CONTEXT_BTN:
      return {
        ...state,
        activeContextBtn: action.contextBtn,
        activeContextBtnData: action.contextBtnData,
      }
    case DEACTIVATE_CONTEXT_BTN:
      return { ...state, activeContextBtn: null, activeContextBtnData: null }

    // * ACTIVE TASK
    case SET_ACTIVE_TASK:
      return { ...state, activeTask: action.activeTask }
    case DEACTIVATE_TASK:
      return { ...state, activeTask: null }

    case START_ADD_COLUMN:
      return { ...state, isAddingColumn: true }
    case COMPLETE_ADD_COLUMN:
      return { ...state, isAddingColumn: false }

    case SET_IMG_TARGET:
      return {
        ...state,
        imgTarget: action.imgTarget,
        imgTargetData: action.imgTargetData,
      }
    case SET_EDIT_LABELS_TARGET:
      return {
        ...state,
        editLabelTarget: action.editLabelTarget,
        editLabelTargetData: action.editLabelTargetData,
      }

    default:
      return state
  }
}
