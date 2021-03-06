import MainPage from '../../components/Main'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProducts } from '../../redux/ducks/products'
import { addProduct } from '../../redux/ducks/cart'

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    addProduct: (product, quantity) => {
      dispatch(addProduct(product, quantity))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
