import React, { Component } from 'react'
import { CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Product from './product'

const styles = {
  btn: {
    marginLeft: 12,
    marginBottom: 12,
    float: 'right'
  },
  btn2: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '16px'
  }
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
              <CardTitle key="title" title="Your shopping cart is still empty" subtitle="Add some products first!" />,
              <RaisedButton key="btn" label="Go Shopping!" secondary={true} style={styles.btn2} onTouchTap={this.goShop} />
            )
          } else {
            this.props.cart.products.map((product) => {
              rows.push(
                <Product key={product.id} product={product} editProduct={editProduct} removeProduct={removeProduct} />
              )
            })
            rows.push(
              <RaisedButton key="purchase" label="Purchase" secondary={true} style={styles.btn} onTouchTap={this.purchase} />,
              <RaisedButton key="remove" label="Remove Everything" primary={true} style={styles.btn} onTouchTap={removeAll} />
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