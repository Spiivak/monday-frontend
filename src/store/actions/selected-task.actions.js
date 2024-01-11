import { boardService } from '../../services/board.service'
import { SET_BOARD } from '../reducers/board.reducer'
import { REMOVE_CHECKED_TASK } from '../reducers/selected-task.reducer'
import { store } from './store'


export async function saveTask(boardId, groupId, task, action = {}) {
	try {
		const board = await boardService.saveTask(boardId, groupId, task, action)
		store.dispatch({ type: SET_BOARD, board })
	} catch (err) {
		throw err
	}
}

export async function removeTask(boardId, taskId, action = {}) {
	try {
		const board = await boardService.removeTask(boardId, taskId, action)
		store.dispatch({ type: REMOVE_CHECKED_TASK, taskId })
		store.dispatch({ type: SET_BOARD, board })
	} catch (err) {
		throw err
	}
}