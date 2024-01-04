import { boardService } from '../../services/board.service'

import { SET_BOARDS } from '../reducers/board.reducer'
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

// export async function removeBoard(boardId) {
//   store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//   try {
//     await boardService.remove(boardId)
//     store.dispatch({ type: REMOVE_BOARD, boardId })
//   } catch (err) {
//     console.error('board action -> cannot remove board', err)
//     throw err
//   } finally {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//   }
// }

// export async function addBoard(user){
//   const board = boardService.getEmptyBoard()
//   board.owner = user
//   saveBoard(board)
// }

// export async function saveBoard(board) {
//   const type = board._id ? UPDATE_BOARD : ADD_BOARD
//   const errType = board._id ? 'update' : 'add'
//   let boardToSave = {...board}
//   store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//   try {
//     boardToSave = await boardService.save(board)
//     store.dispatch({ type, board: boardToSave})
//   } catch (err) {
//     console.error(`board action -> cannot ${errType}`, err)
//     throw err
//   } finally {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//     return boardToSave
//   }
// }

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