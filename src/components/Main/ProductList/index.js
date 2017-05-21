import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import CartIcon from 'material-ui/svg-icons/action/add-shopping-cart'
import Detail from './detail'

const styles = {
  btn: {
    marginRight: '10px'
  }
}

export default class ProductList extends Component {
  constructor(props) {
    super(props)
    this.props.fetchProducts()
    this.state = {
      selected: {},
      openDetail: false
    }
    this.openDetail = this.openDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
  }

  closeDetail() {
    this.setState({openDetail: false})
  }

  openDetail(product) {
    this.setState({
      selected: product,
      openDetail: true
    })
  }

  render() {
    const { products, addProduct } = this.props

    return (
      <div>
        <h1>Product List</h1>
        <GridList
        cols={3}
        padding={10}>
          {products.map((product) => (
            <GridTile
            key={product.id}
            title={<span>{product.name} - ${product.price}</span>}
            subtitle={<span>by {product.brand}</span>}
            actionIcon={<IconButton id={product._id} onTouchTap={() => this.openDetail(product)}><CartIcon color="white" /></IconButton>}>
              <img src={product.picture} />
            </GridTile>
          ))}
        </GridList>
        <Detail
        product={this.state.selected}
        open={this.state.openDetail}
        closeDetail={this.closeDetail}
        addProduct={addProduct} />
      </div>
    )
  }
}
