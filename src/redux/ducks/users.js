// Actions
const FETCH_REQUEST = 'users/FETCH_REQUEST'
const FETCH_SUCCESS = 'users/FETCH_SUCCESS'
const FETCH_FAILURE = 'users/FETCH_FAILURE'

// Initial state
const mainInitialState = { isFetching: false }

// Reducer
const reducer = (state = mainInitialState, action = {}) => {
  switch (action.type) {
  case FETCH_REQUEST:
    return Object.assign({}, {
      isFetching: true
    })
  case FETCH_SUCCESS:
    return Object.assign({}, {
      isFetching: false,
      users: action.payload
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
export const fetchUsers = () => {
  return {
    type: FETCH_REQUEST
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

// Epic
export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_REQUEST)
    .mergeMap(action =>
      ajax.getJSON('https://jsonplaceholder.typicode.com/users')
        .map(response => success(response),
             error => failure())
    );

export default reducer
