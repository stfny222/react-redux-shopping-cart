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
  total: 0.00,
  count: 0,
  products: []
}

// Reducer for single product
const productReducer = (state = {}, action) => {
  switch (action.type) {
  case ADD_PROD:
    return action.product
  case EDIT_PROD:
    if (state.id !== action.id) {
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
    return Object.assign({}, {
      email: action.payload.cart.email,
      total: action.payload.cart.total,
      count: action.payload.cart.count,
      products: action.payload.cart.products
    })
  case ADD_PROD:
    return Object.assign({}, {
      count: state.count++,
      total: state.total+=action.product.price,
      products: [...state.products, productReducer(undefined, action)]
    })
  case EDIT_PROD:
    return state.products.map(p =>
      productReducer(p, action)
    )
  case REMOVE_PROD:
    return Object.assign({}, {
      count: state.count--,
      total: state.total-=action.product.price,
      products: state.products.filter((product) => product.id !== action.id)
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
export const addProduct = product => {
  return {
    type: ADD_PROD,
    product
  }
}

export const editProduct = (id, quantity) => {
  return {
    type: EDIT_PROD,
    id,
    quantity
  }
}

export const removeProduct = id => {
  return {
    type: REMOVE_PROD,
    id
  }
}

export const removeAll = () => {
  return {
    type: REMOVE_ALL
  }
}

// Epic
// export const fetchProductsEpic = action$ =>
//   action$.ofType(FETCH_REQUEST)
//     .mergeMap(action =>
//       ajax.getJSON('http://localhost:3000/products?_page=1&_limit=6')/*&type=food*/
//         .map(response => success(response),
//              error => failure())
//         .takeUntil(action$.ofType(FETCH_CANCEL))
//     );

export default reducer
