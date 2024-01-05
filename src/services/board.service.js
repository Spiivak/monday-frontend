const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

const demoData = [
  {
    _id: 'b101',
    title: 'Placeholder',
    archivedAt: Date.now(),
    createdBy: {
      _id: 'u101',
      fullname: 'test teston',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'test teston',
        imgUrl: 'http://some-img',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
            date: 1589983468418,
            timeline: [1589983468418, 1589983468418],
            file: '',
            members: [],
          },
          {
            id: 'c102',
            title: 'Add Samples',
            members: [],
          },
        ],
        style: {},
      },

      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
            archivedAt: 1589983468418,
            members: [
              {
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              {
                _id: 'u102',
                username: 'Cal',
                fullname: 'Cal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              {
                _id: 'u103',
                username: 'Dal',
                fullname: 'Dal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            ],
          },
          {
            id: 'c104',
            title: 'Help me',
            status: 'Working on it', // monday
            members: [],

            priority: 'high',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            memberIds: ['u101'],
            labelIds: ['l101', 'l102'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        group: {
          id: 'g101',
          title: 'Urgent Stuff',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],

    cmpsOrder: [
      'StatusPicker',
      'MemberPicker',
      'DatePicker',
      'DescriptionPicker',
      'TimeLinePicker',
      'FilePicker',
    ],
  },
]

// import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

// for cookies
// const axios = Axios.create({
//   withCredentials: true,
// })

const BASE_URL = 'board/'
const STORAGE_KEY = 'boardDB'

_demoDataLocalStorage()

export const boardService = {
  query,
  getById,
  save,
  remove,
  getById,
  addGroup,
  removeGroup,
  updateTask,
  addTask,
  removeTask,
  removeColumn,
  getEmptyBoard,
  getEmptyGroup,
}

function query() {
  return storageService.query(STORAGE_KEY)
  // return httpService.get(BASE_URL, { filterBy, sortBy, owner, page })
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId)
  // return httpService.delete(BASE_URL + boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(STORAGE_KEY, board)
    // return httpService.put(BASE_URL, board)
  } else {
    return storageService.post(STORAGE_KEY, board)
    // return httpService.post(BASE_URL, board)
  }
}
// * Groups
function addGroup(boardId, group) {
  return storageService.postGroup(STORAGE_KEY, boardId, group)
}

function removeGroup(boardId, groupId) {
  return storageService.removeGroup(STORAGE_KEY, boardId, groupId)
}

// * Tasks

function updateTask(boardId, groupId, taskId, task) {
  return storageService.putTask(STORAGE_KEY, boardId, groupId, taskId, task)
}

function addTask(boardId, groupId, task) {
  return storageService.postTask(STORAGE_KEY, boardId, groupId, task)
}

function removeTask(boardId, groupId, taskId) {
  return storageService.removeTask(STORAGE_KEY, boardId, groupId, taskId)
}

// * Columns

function removeColumn(boardId, column) {
  return storageService.removeColumn(STORAGE_KEY, boardId, column)
}

// function addMsg(boardId, msg){
//   return httpService.post(BASE_URL + 'msg/' ,{ boardId, msg })
// }

function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    title: 'New Group',
    archivedAt: Date.now(),
    tasks: [
      {
        id: utilService.makeId(),
        title: 'item 1',
      },
      {
        id: utilService.makeId(),
        title: 'item 2',
      },
      {
        id: utilService.makeId(),
        title: 'item 2',
      },
    ],
    style: {},
  }
}

function getEmptyBoard() {
  return {
    title: 'new board',
    archivedAt: Date.now(),
    createdBy: {
      _id: 'u101',
      fullname: 'test teston',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'test teston',
        imgUrl: 'http://some-img',
      },
    ],
    groups: [
      {
        id: utilService.makeId(),
        title: 'Group 1',
        archivedAt: Date.now(),
        tasks: [
          {
            id: utilService.makeId(),
            title: 'item 1',
            members: [],
          },
          {
            id: utilService.makeId(),
            title: 'item 2',
            members: [],
          },
          {
            id: utilService.makeId(),
            title: 'item 3',
            members: [],
          },
        ],
        style: {},
      },
    ],
    activities: [],

    cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
  }
}

// function getEmptyMsg() {
//   return { content: '', owner: {username:'Anonymous'}, createdAt: Date.now(), id: utilService.makeId()}
// }

// function getDefaultFilter() {
//   return { name: '', price: 0, labels: '', Date: '', availability: 'all' }
// }

function _demoDataLocalStorage() {
  const boards = utilService.loadFromStorage(STORAGE_KEY)
  if (!boards || boards.length === 0)
    utilService.saveToStorage(STORAGE_KEY, demoData)
}
