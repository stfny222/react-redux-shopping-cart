import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from '../layout'
import Main from './MainPage'
import Products from './MainPage/Products'
import Cart from './MainPage/Cart'
import NotFound from './NotFound'

const routes = (
  <div>
		<Layout>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/index"/>
        )}/>
        <Main>
          <Switch>
            <Route path='/index' component={ Products } />
            <Route path='/cart' component={ Cart } />
          </Switch>
        </Main>
		    <Route path='*' component={ NotFound } />
      </Switch>
    </Layout>
  </div>
)

export default routes
