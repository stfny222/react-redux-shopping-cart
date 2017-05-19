import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

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
    const { counter, increment, decrement, incrementIfOdd } = this.props

    return (
      <div className='main-container'>
        <h1> Counter: {counter.count} </h1>
        <br/>
        <RaisedButton label='Increment' primary={true} onClick={increment} style={styles.btn} />
        <RaisedButton label='Decrement' secondary={true} onClick={decrement} style={styles.btn} />
        <RaisedButton label='Increment If Odd' onClick={incrementIfOdd} />
      </div>
    )
  }
}
