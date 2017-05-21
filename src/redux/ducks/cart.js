import { ajax } from 'rxjs/observable/dom/ajax'
import { REHYDRATE } from 'redux-persist/constants'

// Actions
const ADD_PROD = 'cart/ADD_PROD'
const EDIT_PROD = 'cart/EDIT_PROD'
const REMOVE_PROD = 'cart/REMOVE_PROD'
const REMOVE_ALL = 'cart/REMOVE_ALL'
//TODO
const PURCHASE = 'cart/PURCHASE'

// Initial state
const mainInitialState = {
  email: '',
  total: 0.00,
  count: 0,
  products: []
}

// Reducer for single product
const productReducer = (state = {}, action) => {
  switch (action.type) {
  case ADD_PROD:
    return Object.assign({}, action.product, {
      quantity: action.quantity
    })
  case EDIT_PROD:
    if (state.id !== action.product.id) {
      return state
    }
    return Object.assign({}, state, {
      quantity: action.quantity
    })
  default:
    return state
  }
}

// Reducer
const reducer = (state = mainInitialState, action = {}) => {
  switch (action.type) {
  case REHYDRATE:
    if (!action.payload.cart) {
      return state
    }
    return Object.assign({}, {
      email: action.payload.cart.email ? action.payload.cart.email : state.email,
      total: action.payload.cart.total ? action.payload.cart.total : state.total,
      count: action.payload.cart.count ? action.payload.cart.count : state.count,
      products: action.payload.cart.products ? action.payload.cart.products : state.products
    })
  case ADD_PROD:
    return Object.assign({}, {
      count: state.count + action.quantity,
      total: state.total + action.product.price * action.quantity,
      products: [...state.products, productReducer(undefined, action)]
    })
  case EDIT_PROD:
    return Object.assign({}, {
      count: state.count + action.diff,
      total: state.total + action.product.price * action.diff,
      products: state.products.map(p =>
        productReducer(p, action)
      )
    })
  case REMOVE_PROD:
    return Object.assign({}, {
      count: state.count - action.product.quantity,
      total: state.total - action.product.price * action.product.quantity,
      products: state.products.filter((product) => product.id !== action.product.id)
    })
  case REMOVE_ALL:
    return Object.assign({}, {
      total: 0.00,
      count: 0,
      products: []
    })
  default:
    return state
  }
}

// Action Creators
export const addProduct = (product, quantity) => {
  return {
    type: ADD_PROD,
    product,
    quantity
  }
}

export const editProduct = (product, quantity, diff) => {
  return {
    type: EDIT_PROD,
    product,
    quantity,
    diff
  }
}

export const removeProduct = product => {
  return {
    type: REMOVE_PROD,
    product
  }
}

export const removeAll = () => {
  return {
    type: REMOVE_ALL
  }
}

export default reducer
