import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import counter, { incrementIfOddEpic } from '../ducks/counter'
import users, { fetchUserEpic } from '../ducks/users'

export const rootEpic = combineEpics(
  incrementIfOddEpic,
  fetchUserEpic
);

const rootReducer = combineReducers({
  counter,
  users
})

export default rootReducer
