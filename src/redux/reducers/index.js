import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import counter, { incrementIfOddEpic } from '../ducks/counter'
import products, { fetchProductsEpic } from '../ducks/products'

export const rootEpic = combineEpics(
  fetchProductsEpic
);

const rootReducer = combineReducers({
  products
})

export default rootReducer
