// Actions
const INCREMENT = 'counter/INCREMENT'
const DECREMENT = 'counter/DECREMENT'
const INCREMENT_IF_ODD = 'counter/INCREMENT_IF_ODD'

// Initial state
const mainInitialState = { count: 0 }

// Reducer
const reducer = (state = mainInitialState, action = {}) => {
  switch (action.type) {
  case INCREMENT:
    return Object.assign({}, {count: state.count + 1})
  case DECREMENT:
    return Object.assign({}, {count: state.count - 1})
  default:
    return state
  }
}

// Action Creators
export const increment = () => {
  return {
    type: INCREMENT
  }
}

export const decrement = () => {
  return {
    type: DECREMENT
  }
}

export const incrementIfOdd = () => {
  return {
    type: INCREMENT_IF_ODD
  }
}

// Epic
export const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    .filter(() => store.getState().counter.count % 2 === 1)
    .map(() => increment());

export default reducer
