import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer, { rootEpic } from '../reducers'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// persist redux state in browser
import { persistStore, autoRehydrate } from 'redux-persist'

const epicMiddleware = createEpicMiddleware(rootEpic)

const history = createHistory()
const routerMid = routerMiddleware(history)

const finalCreateStore = compose(
  applyMiddleware(routerMid, epicMiddleware),
  autoRehydrate()
)(createStore)

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  persistStore(store)
  return store
}
