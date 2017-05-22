import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'
import SearchIcon from 'material-ui/svg-icons/action/search'
import TextField from 'material-ui/TextField'
import CartIcon from 'material-ui/svg-icons/action/add-shopping-cart'
import Detail from './detail'

export default class ProductList extends Component {
  constructor(props) {
    super(props)
    this.props.fetchProducts()
    this.state = {
      selected: {},
      openDetail: false,
      filter: 1,
      search: ''
    }
    this.openDetail = this.openDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.searchChange = this.searchChange.bind(this)
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
  filterChange(event, index, value) {
    if (this.state.filter != value) {
      this.setState({filter: value})
      if (value === 1) {
        this.props.fetchProducts()
      } else {
        this.props.filterProducts(value)
      }
    }
  }
  searchChange(event) {
    this.setState({
      search: event.target.value,
    }, () => {
      if (this.state.search != '') {
        this.props.searchProducts(this.state.search)
      } else if (this.state.filter === 1) {
        this.props.fetchProducts()
      } else {
        this.props.filterProducts(this.state.filter)
      }
    });
  }
  render() {
    const { products, addProduct } = this.props

    return (
      <div>
        <h1>Product List</h1>
        <div className='flexContainer'>
          <h3>Show me:</h3>
          <DropDownMenu value={this.state.filter} onChange={this.filterChange}>
            <MenuItem value={1} primaryText='Everything!' />
            <MenuItem value={'food'} primaryText='Food Products' />
            <MenuItem value={'transport'} primaryText='Transport Products' />
          </DropDownMenu>
          <ListItem style={{paddingTop: '0px', paddingBottom: '0px', float: 'right'}} disabled={true}
          leftIcon={<SearchIcon id='icon' style={{margin: '0px 0px 0px 20px', position: 'absolute', top: '30%', display: 'flex', alignItems: 'center'}} />} >
            <TextField
            hintText='Buscar'
            value={this.state.search}
            onChange={this.searchChange} />
          </ListItem>
        </div>
        <GridList
        cols={3}
        padding={10}>
          {products.map((product) => (
            <GridTile
            key={product.id}
            title={<span>{product.name} - ${product.price}</span>}
            subtitle={<span>by {product.brand}</span>}
            actionIcon={<IconButton id={product.id} onTouchTap={() => this.openDetail(product)}><CartIcon color='white' /></IconButton>}>
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
