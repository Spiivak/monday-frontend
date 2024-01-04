import { combineReducers, compose, legacy_createStore as createStore } from "redux"

import { boardReducer } from "./reducers/board.reducer"

const rootReducer = combineReducers({
  boardModule: boardReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store