import MainPage from '../../components/Main'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProducts } from '../../redux/ducks/products'

const mapStateToProps = (state) => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
