import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { CardTitle } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import CartIcon from 'material-ui/svg-icons/action/remove-shopping-cart'

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.quantity ? this.props.product.quantity : 1
    }
    this.changeQuantity = this.changeQuantity.bind(this)
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      quantity: newProps.product.quantity
    })
  }
  changeQuantity(event, index, value) {
    this.props.editProduct(this.props.product, value, value - this.props.product.quantity)
    this.setState({quantity: value})
  }
  render() {
    const { product, editProduct, removeProduct } = this.props

    return (
      <div>
        <Paper style={{ padding: '20px', display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
          <img width='150' height='100' src={product.picture} />
          <div className='prodContainer'>
            <CardTitle style={{width: '70%'}} title={<span>{product.name} - ${product.price}</span>} subtitle={<span>by {product.brand}</span>} />
            <SelectField
            floatingLabelText="Quantity"
            value={this.state.quantity}
            onChange={this.changeQuantity}
            style={{ width: '20%', float: 'right' }}>
              {(() => {
                let rows = []
                let i=1
                while (i<=10) {
                  rows.push(
                    <MenuItem key={i} value={i} primaryText={i} />
                  )
                  i++
                }
                return rows
              })()}
            </SelectField>
            <IconButton style={{ float: 'right', width: '10%' }} id={product.id} onTouchTap={() => removeProduct(product)}><CartIcon color="red" /></IconButton>
          </div>
        </Paper>
      </div>
    )
  }
}
