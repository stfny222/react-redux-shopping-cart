import Cart from '../../../components/Main/Cart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {  } from '../../../redux/ducks/products'
import { editProduct, removeProduct, removeAll, purchase } from '../../../redux/ducks/cart'

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (product, quantity, diff) => {
      dispatch(editProduct(product, quantity, diff))
    },
    removeProduct: (product) => {
      dispatch(removeProduct(product))
    },
    removeAll: () => {
      dispatch(removeAll())
    },
    purchase: (payload) => {
      dispatch(purchase(payload))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
