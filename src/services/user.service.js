const demoData = [
  {
    _id: 'u1',
    fullname: 'Nave David',
    username: 'navedavid@gmail.com',
    imgUrl:
      'https://res.cloudinary.com/donnezwy9/image/upload/v1704455572/rzddgfxj4fzkcn6eqgrv.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u2',
    fullname: 'Dima Revelson',
    username: 'dimarevelson@gmail.com',
    imgUrl:
      'https://res.cloudinary.com/donnezwy9/image/upload/v1704459492/mv8vwh55b3wgqdflmemw.png',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u3',
    fullname: 'Emily Kristensen',
    username: 'emilyKristensen@gmail.com',
    imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u4',
    fullname: 'Isabelle Anderson',
    username: 'isabelle.anderson@example.com',
    imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u5',
    fullname: 'Mare Alleman',
    username: 'mare.alleman@example.com',
    imgUrl: 'https://randomuser.me/api/portraits/med/women/25.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u6',
    fullname: 'Mirogost Gaydenko',
    username: 'mirogost.gaydenko@example.com',
    imgUrl: 'https://randomuser.me/api/portraits/med/men/6.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u7',
    fullname: 'Hugo Diederichs',
    username: 'hugo.diederichs@example.com',
    imgUrl: 'https://randomuser.me/api/portraits/med/men/74.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
  {
    _id: 'u8',
    fullname: 'Nella Lammi',
    username: 'nella.lammi@example.com',
    imgUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    // mentions: [
    //   {
    //     //optional
    //     id: 'm101',
    //     boardId: 'm101',
    //     taskId: 't101',
    //   },
    // ],
  },
]
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'

_demoUserDataLocalStorage()

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
}

window.userService = userService

function getUsers() {
  return storageService.query(STORAGE_KEY)
  // return httpService.get(`user`)
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  // const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  const user = await storageService.get('user', _id)
  user.score = score
  await storageService.put('user', user)

  // const user = await httpService.put(`user/${_id}`, {_id, score})

  // When admin updates other user's details, do not update loggedinUser
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const users = await storageService.query('user')
  const user = users.find((user) => user.username === userCred.username)
  // const user = await httpService.post('auth/login', userCred)
  if (user) return saveLocalUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  userCred.score = 10000
  const user = await storageService.post('user', userCred)
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: user.score,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function _demoUserDataLocalStorage() {
  const users = utilService.loadFromStorage(STORAGE_KEY)
  if (!users || users.length === 0)
    utilService.saveToStorage(STORAGE_KEY, demoData)
}
