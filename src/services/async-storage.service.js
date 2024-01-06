export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postGroup,
  removeGroup,
  putTask,
  postTask,
  removeTask,
  addColumn,
  removeColumn,
  updateColumn,
}

function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    return entity
  })
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType, updatedEntity) {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// group CRUD

function postGroup(entityType, boardId, newGroup) {
  newGroup = JSON.parse(JSON.stringify(newGroup))
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return { ...board, groups: [...board.groups, newGroup] }
    })
    _save(entityType, newBoards)
    return newGroup
  })
}

function removeGroup(entityType, boardId, groupId) {
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        groups: board.groups.filter((group) => group.id !== groupId),
      }
    })
    _save(entityType, newBoards)
    return groupId
  })
}

// task CRUD

function putTask(entityType, boardId, groupId, taskId, newTask) {
  newTask = JSON.parse(JSON.stringify(newTask))
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        groups: board.groups.map((group) => {
          if (group.id !== groupId) return group
          return {
            ...group,
            tasks: group.tasks.map((task) => {
              if (task.id !== taskId) return task
              return newTask
            }),
          }
        }),
      }
    })
    _save(entityType, newBoards)
    return newTask
  })
}

function postTask(entityType, boardId, groupId, newTask) {
  newTask = JSON.parse(JSON.stringify(newTask))
  newTask.id = _makeId()
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        groups: board.groups.map((group) => {
          if (group.id !== groupId) return group
          return { ...group, tasks: [...group.tasks, newTask] }
        }),
      }
    })
    _save(entityType, newBoards)
    return newTask
  })
}

function removeTask(entityType, boardId, groupId, taskId) {
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        groups: board.groups.map((group) => {
          if (group.id !== groupId) return group
          return {
            ...group,
            tasks: group.tasks.filter((task) => task.id !== taskId),
          }
        }),
      }
    })
    _save(entityType, newBoards)
    return taskId
  })
}

// columns CRUD

function addColumn(entityType, boardId, column) {
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return { ...board, cmpsOrder: [...board.cmpsOrder, column] }
    })
    _save(entityType, newBoards)
    return column
  })
}

function removeColumn(entityType, boardId, columnId) {
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        cmpsOrder: board.cmpsOrder.filter((cmp) => cmp.id !== columnId),
      }
    })
    _save(entityType, newBoards)
    return columnId
  })
}

function updateColumn(entityType, boardId, columnId, column) {
  return query(entityType).then((boards) => {
    const newBoards = boards.map((board) => {
      if (board._id !== boardId) return board
      return {
        ...board,
        cmpsOrder: board.cmpsOrder.map((cmp) => {
          if (cmp.id !== columnId) return cmp
          return column
        }),
      }
    })
    _save(entityType, newBoards)
    return column
  })
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
