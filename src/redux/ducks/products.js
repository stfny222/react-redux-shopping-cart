import { ajax } from 'rxjs/observable/dom/ajax'
import { REHYDRATE } from 'redux-persist/constants'

// Actions
const FETCH_REQUEST = 'users/FETCH_REQUEST'
const FETCH_SUCCESS = 'users/FETCH_SUCCESS'
const FETCH_FAILURE = 'users/FETCH_FAILURE'
const FETCH_CANCEL = 'users/FETCH_CANCEL'

// Initial state
const mainInitialState = { isFetching: false }

// Reducer
const reducer = (state = mainInitialState, action = {}) => {
  switch (action.type) {
  case FETCH_FAILURE:
    return Object.assign({}, {
      products: action.payload.products
    })
  case FETCH_REQUEST:
    return Object.assign({}, {
      isFetching: true
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

const success = payload => {
  console.log(payload)
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

// Epic
export const fetchProductsEpic = action$ =>
  action$.ofType(FETCH_REQUEST)
    .mergeMap(action =>
      ajax.getJSON('http://localhost:3000/products')
        .map(response => success(response),
             error => failure())
        .takeUntil(action$.ofType(FETCH_CANCEL))
    );

export default reducer
