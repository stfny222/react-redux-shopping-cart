import MainPage from '../../components/Main'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { increment, decrement, incrementIfOdd } from '../../redux/ducks/counter'

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    incrementIfOdd: () => {
      dispatch(incrementIfOdd())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
