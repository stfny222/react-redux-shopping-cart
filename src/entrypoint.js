import React from 'react'
import { render } from 'react-dom'
import { configureStore } from './redux/store'
import { Root } from './containers/Root'
// Here we're importing every RxJS operator. 
import 'rxjs'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('app')
)
