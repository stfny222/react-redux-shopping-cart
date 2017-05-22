import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import CartIcon from 'material-ui/svg-icons/maps/local-grocery-store'

const GoToCart = (props) => (
  <Link to="/cart">
    <Badge
    badgeContent={props.count}
    secondary={true}
    style={{padding: '0px 10px 0px 0px'}}
    badgeStyle={{width: 20, height: 20, top: 27}}>
      <IconButton tooltip="Go to Cart">
        <CartIcon color="#FFF" />
      </IconButton>
    </Badge>
  </Link>
)

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }
  handleTouchTap() {
    this.context.router.history.push('/index')
  }
  render() {
    const { count } = this.props

    return (
      <AppBar
      title={<span style={{ cursor: 'pointer' }}>Shopping Cart Example</span>}
      onTitleTouchTap={this.handleTouchTap}
      iconElementRight={<GoToCart count={count} />} />
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}
