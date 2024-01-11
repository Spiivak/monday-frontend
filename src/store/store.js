import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'

import { boardReducer } from './reducers/board.reducer'
import { userReducer } from './reducers/user.reducer'
import { systemReducer } from './reducers/system.reducer'
// import { selectedTaskReducer } from './reducers/selected-task.reducer'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  // taskModule: selectedTaskReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
