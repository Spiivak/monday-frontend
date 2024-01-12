import io from 'socket.io-client'
import { userService } from './user.service.js'
import { store } from '../store/store.js'
import {
  ADD_COLUMN,
  ADD_GROUP,
  ADD_TASK,
  REMOVE_COLUMN,
  REMOVE_GROUP,
  UPDATE_GROUP,
} from '../store/reducers/board.reducer.js'
import {
  REMOVE_TASK,
  UPDATE_COLUMN,
  UPDATE_TASK,
} from '../store/reducers/board.reducer.js'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'

export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(user) {
      socket.emit(SOCKET_EMIT_LOGIN, user)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}

// * TASK SOCKETS *
socketService.on('add-task', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, groupId, task } = data
  store.dispatch({ type: ADD_TASK, boardId, groupId, task })
})
socketService.on('update-task', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, groupId, taskId, task } = data
  store.dispatch({ type: UPDATE_TASK, boardId, groupId, taskId, task })
})
socketService.on('remove-task', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, groupId, deletedTaskId } = data
  store.dispatch({ type: REMOVE_TASK, boardId, groupId, deletedTaskId })
})

// * COLUMN SOCKETS *
socketService.on('add-column', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, addedColumn } = data
  store.dispatch({ type: ADD_COLUMN, boardId, addedColumn })
})
socketService.on('update-column', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, columnId, updatedColumn } = data
  store.dispatch({ type: UPDATE_COLUMN, boardId, columnId, updatedColumn })
})
socketService.on('remove-column', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, columnId } = data
  store.dispatch({ type: REMOVE_COLUMN, boardId, deletedColumnId: columnId })
})

// * COLUMN SOCKETS *
socketService.on('add-group', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, group } = data
  store.dispatch({ type: ADD_GROUP, boardId, savedGroup: group })
})
socketService.on('update-group', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, groupId, group } = data
  store.dispatch({ type: UPDATE_GROUP, boardId, groupId, updatedGroup: group })
})
socketService.on('remove-group', (data) => {
  const user = userService.getLoggedinUser()
  console.log(user.fullname,':', data)
  const { boardId, groupId } = data
  store.dispatch({ type: REMOVE_GROUP, boardId, deletedGroupId: groupId })
})
