import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.add = this.add.bind(this)
  }
  handleChange(event, index, value){
    this.setState({quantity: value})
  }
  add(){
    this.props.addProduct(this.props.product, this.state.quantity)
    this.props.closeDetail()
  }
  render() {
    const { product, open, closeDetail } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={closeDetail} />,
      <FlatButton
        label="Add to cart"
        primary={true}
        onTouchTap={this.add} />,
    ];
    return (
      <div>
        <Dialog
        title={product.name}
        actions={actions}
        open={open}
        onRequestClose={closeDetail}>
          <div className='flex'>
            <div className='block'>
              <div className='row'>
                <span className='label'>Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className='row'>
                <span className='label'>Description:</span>
              </div>
              <div className='row'>
                <p>{product.about}</p>
              </div>
              <div className='row'>
                <span className='label'>Price:</span>
                <span>${product.price}</span>
              </div>
              <div className='row'>
                <SelectField
                floatingLabelText="Quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                style={{ width: '100px' }}>
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
              </div>
            </div>
            <img height='300' src={product.picture} />
          </div>
        </Dialog>
      </div>
    );
  }
}
