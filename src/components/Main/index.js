import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Header from './Header'
import ProductList from './ProductList'

const styles = {
  btn: {
    marginRight: '10px'
  }
}

export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { products, fetchProducts } = this.props

    return (
      <div>
        <Header count={0} />
        <div className='main-container'>
          <ProductList products={products} fetchProducts={fetchProducts} />
        </div>
      </div>
    )
  }
}
