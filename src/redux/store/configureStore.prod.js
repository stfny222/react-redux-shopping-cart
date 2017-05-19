import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer, { rootEpic } from '../reducers'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const epicMiddleware = createEpicMiddleware(rootEpic)

const history = createHistory()
const routerMid = routerMiddleware(history)

const finalCreateStore = compose(
  applyMiddleware(routerMid, epicMiddleware)
)(createStore)

module.exports = function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
