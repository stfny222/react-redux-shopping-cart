import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'

import products, { fetchProductsEpic, filterProductsEpic } from '../ducks/products'
import cart, { postCartEpic } from '../ducks/cart'

export const rootEpic = combineEpics(
  fetchProductsEpic,
  filterProductsEpic,
  postCartEpic
);

const rootReducer = combineReducers({
  products,
  cart
})

export default rootReducer
