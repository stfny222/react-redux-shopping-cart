import React, { Component } from 'react'
import { CardTitle } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import Product from './product'

const mainBtnStyle = {
  marginLeft: 12,
  float: 'right'
}

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      openSnack: false,
      email: '',
      emailError: ''
    }
    this.goShop = this.goShop.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.closeSnack = this.closeSnack.bind(this)
    this.confirm = this.confirm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.message != '') {
      this.setState({openSnack: true})
    }
  }
  goShop() {
    this.context.router.history.push('/index')
  }
  openDialog() {
    this.setState({openDialog: true})
  }
  closeDialog() {
    this.setState({openDialog: false})
  }
  closeSnack() {
    this.setState({openSnack: false})
  }
  confirm() {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!regex.test(this.state.email)) {
      this.setState({
        emailError: 'Please, enter a valid email'
      })
    } else {
      this.setState({
        emailError: ''
      }, () => {
        this.props.purchase(this.state.email)
        this.closeDialog()
      })
    }
  }
  handleChange(event) {
    this.setState({email: event.target.value})
  }
  render() {
    const { cart, editProduct, removeProduct, removeAll } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label="Purchase"
        primary={true}
        onTouchTap={this.confirm}
      />,
    ]
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
                <RaisedButton key='remove' label='Remove Everything' primary={true} style={mainBtnStyle} onTouchTap={removeAll} />
                <RaisedButton key='purchase' label='Purchase' secondary={true} style={mainBtnStyle} onTouchTap={this.openDialog} />
              </div>
            )
          }
          return rows
        }).bind(this)()}
        <Dialog
          title="Confirm Purchase"
          actions={actions}
          modal={true}
          open={this.state.openDialog}>
          The total purchase price is ${this.props.cart.total}. To proceed, you first need to enter your email.
          <TextField
          hintText='email@example.com'
          errorText={this.state.emailError}
          value={this.state.email}
          onChange={this.handleChange}
          floatingLabelText='email'
          floatingLabelFixed={true} />
        </Dialog>
        <Snackbar
          open={this.state.openSnack}
          message={cart.message}
          onRequestClose={this.closeSnack} />
      </div>
    )
  }
}

Cart.contextTypes = {
  router: React.PropTypes.object.isRequired
}
