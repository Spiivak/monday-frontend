export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  putTask,
  postTask,
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
