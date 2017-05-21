import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  label: {
    paddingRight: '50px'
  },
  content: {
  },
  row: {
    paddingRight: '50px',
    marginBottom: '15px'
  },
  customWidth: {
    width: '100px'
  }
}

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
        onRequestClose={closeDetail} >
          <div style={{display: 'flex'}}>
            <div style={{display: 'block'}}>
              <div style={styles.row}>
                <span style={styles.label}>Brand:</span>
                <span style={styles.content}>{product.brand}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Description:</span>
              </div>
              <div style={styles.row}>
                <p style={styles.content}>{product.about}</p>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Price:</span>
                <span style={styles.content}>${product.price}</span>
              </div>
              <div style={styles.row}>
                <SelectField
                floatingLabelText="Quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                style={styles.customWidth}>
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
            <img style={{height: 300}} src={product.picture} />
          </div>
        </Dialog>
      </div>
    );
  }
}
