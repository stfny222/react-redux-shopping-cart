import React, { Component } from 'react'
import { CardTitle } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Product from './product'

const mainBtnStyle = {
  marginLeft: 12,
  float: 'right'
}

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.goShop = this.goShop.bind(this)
  }
  goShop() {
    this.context.router.history.push('/index')
  }
  render() {
    const { cart, editProduct, removeProduct, removeAll } = this.props

    return (
      <div>
        {(() => {
          let rows = []
          if (this.props.cart.count===0) {
            rows.push(
              <CardTitle key='title' title='Your shopping cart is still empty' subtitle='Add some products first!' />,
              <RaisedButton key='btn' label='Go Shopping!' secondary={true} style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '16px' }} onTouchTap={this.goShop} />
            )
          } else {
            this.props.cart.products.map((product) => {
              rows.push(
                <Product key={product.id} product={product} editProduct={editProduct} removeProduct={removeProduct} />
              )
            })
            rows.push(
              <div key='foot' className='footContainer'>
                <div>
                  <Subheader style={{lineHeight: '20px'}}>Total:</Subheader>
                  <CardTitle style={{padding: '0px 16px 0px 16px'}} title={<span>${this.props.cart.total}</span>} />
                </div>
                <RaisedButton key='purchase' label='Purchase' secondary={true} style={mainBtnStyle} onTouchTap={this.purchase} />
                <RaisedButton key='remove' label='Remove Everything' primary={true} style={mainBtnStyle} onTouchTap={removeAll} />
              </div>
            )
          }
          return rows
        }).bind(this)()}
      </div>
    )
  }
}

Cart.contextTypes = {
  router: React.PropTypes.object.isRequired
}
