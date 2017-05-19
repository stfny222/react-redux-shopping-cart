import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import CartIcon from 'material-ui/svg-icons/maps/local-grocery-store'

const styles = {
  title: {
    cursor: 'pointer',
  }
}

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const Cart = (props) => (
  <Badge
  badgeContent={props.count}
  secondary={true}
  style={{padding: '0px 10px 0px 0px'}}
  badgeStyle={{width: 20, height: 20, top: 27}}>
    <IconButton tooltip="Go to Cart">
      <CartIcon color="#FFF" />
    </IconButton>
  </Badge>
)

const Header = (props) => (
  <AppBar
    title={<span style={styles.title}>Shopping Cart Example</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementRight={<Cart count={props.count} />}
  />
)

export default Header
