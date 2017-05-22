import { ajax } from 'rxjs/observable/dom/ajax'
import { concat } from 'rxjs/observable/concat'
import { of } from 'rxjs/observable/of'
import { REHYDRATE } from 'redux-persist/constants'
import { BASEURL, CARTS } from '../constants'

// Actions
const ADD_PROD = 'cart/ADD_PROD'
const EDIT_PROD = 'cart/EDIT_PROD'
const REMOVE_PROD = 'cart/REMOVE_PROD'
const REMOVE_ALL = 'cart/REMOVE_ALL'
const PURCHASE = 'cart/PURCHASE'
const PURCHASE_SUCCESS = 'cart/PURCHASE_SUCCESS'
const PURCHASE_FAILURE = 'cart/PURCHASE_FAILURE'
const ADD_EMAIL = 'cart/ADD_EMAIL'

// Initial state
const mainInitialState = {
  email: '',
  total: 0.00,
  count: 0,
  products: [],
  message: ''
}

// Reducer for single product
const productReducer = (state = {}, action) => {
  switch (action.type) {
  case ADD_PROD:
    return Object.assign({}, action.product, {
      quantity: action.quantity,
      subtotal: parseFloat(action.product.price * action.quantity).toFixed(2)
    })
  case EDIT_PROD:
    if (state.id !== action.product.id) {
      return state
    }
    return Object.assign({}, state, {
      quantity: action.quantity,
      subtotal: parseFloat(action.product.price * action.quantity).toFixed(2)
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
      products: action.payload.cart.products ? action.payload.cart.products : state.products,
      message: ''
    })
  case ADD_PROD:
    return Object.assign({}, {
      count: state.count + action.quantity,
      total: (parseFloat(state.total) + parseFloat(action.product.price * action.quantity)).toFixed(2),
      products: [...state.products, productReducer(undefined, action)],
      message: ''
    })
  case EDIT_PROD:
    return Object.assign({}, {
      count: state.count + action.diff,
      total: (parseFloat(state.total) + parseFloat(action.product.price * action.diff)).toFixed(2),
      products: state.products.map(p =>
        productReducer(p, action)
      ),
      message: ''
    })
  case REMOVE_PROD:
    return Object.assign({}, {
      count: state.count - action.product.quantity,
      total: (parseFloat(state.total) - parseFloat(action.product.price * action.product.quantity)).toFixed(2),
      products: state.products.filter((product) => product.id !== action.product.id),
      message: ''
    })
  case REMOVE_ALL:
    return Object.assign({}, {
      total: 0.00,
      count: 0,
      products: [],
      message: ''
    })
  case ADD_EMAIL:
    return Object.assign({}, {
      email: action.email
    })
  case PURCHASE_SUCCESS:
    return Object.assign({}, {
      total: 0.00,
      count: 0,
      products: [],
      message: 'Your purchase was successful!'
    })
  case PURCHASE_FAILURE:
    return Object.assign({}, {
      message: 'There was an error. Please, try again.'
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

export const addEmail = (email) => {
  return {
    type: ADD_EMAIL,
    email
  }
}

export const purchase = (payload) => {
  return {
    type: PURCHASE,
    payload
  }
}

export const success = () => {
  return {
    type: PURCHASE_SUCCESS
  }
}

export const failure = () => {
  return {
    type: PURCHASE_FAILURE
  }
}

// Epics
export const postCartEpic = (action$, store) =>
  action$.ofType(PURCHASE)
    .mergeMap(action =>
      concat(
        of(addEmail(action.email)),
        ajax.post(BASEURL + CARTS, store.getState().cart)
        .map(response => success(response),
             error => failure())
      )
    )

export default reducer
