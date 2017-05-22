import { ajax } from 'rxjs/observable/dom/ajax'
import { REHYDRATE } from 'redux-persist/constants'
import { BASEURL, PRODUCTS } from '../constants'

// Actions
const FETCH_REQUEST = 'products/FETCH_REQUEST'
const FILTER_REQUEST = 'products/FILTER_REQUEST'
const FETCH_SUCCESS = 'products/FETCH_SUCCESS'
const FETCH_FAILURE = 'products/FETCH_FAILURE'
const FETCH_CANCEL = 'products/FETCH_CANCEL'

// Initial state
const mainInitialState = {
  isFetching: false,
  products: []
}

// Reducer
const reducer = (state = mainInitialState, action = {}) => {
  switch (action.type) {
  /* case REHYDRATE:
    return Object.assign({}, {
      products: action.payload.products.products
    }) */
  case FETCH_REQUEST:
    return Object.assign({}, {
      isFetching: true,
      products: [...state.products]
    })
  case FILTER_REQUEST:
    return Object.assign({}, {
      isFetching: true,
      products: [...state.products]
    })
  case FETCH_SUCCESS:
    return Object.assign({}, {
      isFetching: false,
      products: action.payload
    })
  case FETCH_CANCEL:
    return Object.assign({}, {
      isFetching: false
    })
  case FETCH_FAILURE:
    return Object.assign({}, {
      isFetching: false
    })
  default:
    return state
  }
}

// Action Creators
export const fetchProducts = () => {
  return {
    type: FETCH_REQUEST
  }
}

export const filterProducts = filter => {
  return {
    type: FILTER_REQUEST,
    filter
  }
}

const success = payload => {
  return {
    type: FETCH_SUCCESS,
    payload
  }
}

const failure = () => {
  return {
    type: FETCH_FAILURE
  }
}

// Epics
export const fetchProductsEpic = action$ =>
  action$.ofType(FETCH_REQUEST)
    .mergeMap(action =>
      ajax.getJSON(BASEURL + PRODUCTS)/*?_page=1&_limit=6&type=food*/
        .map(response => success(response),
             error => failure())
        .takeUntil(action$.ofType(FETCH_CANCEL))
    )

export const filterProductsEpic = action$ =>
    action$.ofType(FILTER_REQUEST)
      .mergeMap(action =>
        ajax.getJSON(BASEURL + PRODUCTS + '?type=' + action.filter)
          .map(response => success(response),
               error => failure())
          .takeUntil(action$.ofType(FETCH_CANCEL))
      )

export default reducer
