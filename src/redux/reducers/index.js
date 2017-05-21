import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import products, { fetchProductsEpic } from '../ducks/products'
import cart from '../ducks/cart'

export const rootEpic = combineEpics(
  fetchProductsEpic
);

const rootReducer = combineReducers({
  products,
  cart
})

export default rootReducer
