import Cart from '../../../components/Main/Cart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {  } from '../../../redux/ducks/products'
import { editProduct, removeProduct, removeAll } from '../../../redux/ducks/cart'

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (id, quantity) => {
      dispatch(editProduct(id, quantity))
    },
    removeProduct: (id, quantity) => {
      dispatch(removeProduct(id, quantity))
    },
    removeAll: () => {
      dispatch(removeAll())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
