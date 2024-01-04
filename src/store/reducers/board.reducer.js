import { boardService } from '../../services/board.service.js'
export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const GET_BOARD_BY_ID = 'GET_BOARD_BY_ID'

const initialState = {
  boards: [],
}

export function boardReducer(state = initialState, action = {}) {
  let boards

  switch (action.type) {
    // * BOARDS CRUD
    case SET_BOARDS:
      return { ...state, boards: action.boards, totalPages: action.totalPages }

    case REMOVE_BOARD:
      boards = state.boards.filter((board) => board._id !== action.boardId)
      return { ...state, boards }

    case ADD_BOARD:
      boards = [action.board, ...state.boards]
      return { ...state, boards }

    case UPDATE_BOARD:
      boards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      return { ...state, boards }

    default:
      return state
  }
}
