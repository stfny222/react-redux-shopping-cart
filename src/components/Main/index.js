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
    const { cart } = this.props

    return (
      <div>
        <Header count={cart.count} />
        <div className='main-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
