import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import routes from '../routes'

const history = createHistory()

export const Root = class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            {routes}
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}
