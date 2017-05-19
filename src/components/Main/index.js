import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Header from './Header'

const styles = {
  btn: {
    marginRight: '10px'
  }
}

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {count: props.initialCount}
  }
  render() {
    const { products, fetchProducts } = this.props

    return (
      <div>
        <Header count={0} />
        <div className='main-container'>
          <RaisedButton label="Fetch" onTouchTap={fetchProducts} />
        </div>
      </div>
    )
  }
}
