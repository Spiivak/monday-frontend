export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getFormattedDate,
  getGreeting,
  timeDiff,
  formatDateRange,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function timeDiff(ts) {
  const now = Date.now()
  let tsDiff = now - ts

  tsDiff = Math.floor(tsDiff / 1000) //sec
  if (tsDiff < 60) return tsDiff + 's'
  tsDiff = Math.floor(tsDiff / 60) //min
  if (tsDiff < 60) return tsDiff + 'm'
  tsDiff = Math.floor(tsDiff / 60) //hour
  if (tsDiff < 24) return tsDiff + 'h'
  tsDiff = Math.floor(tsDiff / 24) //day
  if (tsDiff < 7) return tsDiff + 'd'
  tsDiff = Math.floor(tsDiff / 7) //week
  if (tsDiff < 4) return tsDiff + 'w'
  tsDiff = Math.floor(tsDiff / 4) //month
  if (tsDiff < 12) return tsDiff + 'months'
  tsDiff = Math.floor(tsDiff / 12) //year
  return tsDiff + ' years ago'
}

function getFormattedDate(timestamp) {
  const dateObject = new Date(timestamp)

  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1 // Months are zero-based, so we add 1
  const year = dateObject.getFullYear()

  return { day, month, year }
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getGreeting() {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 0 && hours < 12) {
    return 'Good morning'
  } else if (hours >= 12 && hours < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

function formatDateRange(timestamps) {
  if (timestamps.length !== 2) {
    throw new Error('Expected an array of two timestamps')
  }

  const [startTimestamp, endTimestamp] = timestamps
  const startDate = new Date(startTimestamp)
  const endDate = new Date(endTimestamp)

  const startDayNumber = startDate.getDate()
  const endDayNumber = endDate.getDate()
  const startMonthAbbreviation = startDate.toLocaleString('default', {
    month: 'short',
  })
  const endMonthAbbreviation = endDate.toLocaleString('default', {
    month: 'short',
  })

  return `${startDayNumber} ${startMonthAbbreviation} - ${endDayNumber} ${endMonthAbbreviation}`
}
