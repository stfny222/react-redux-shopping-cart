import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from '../layout'
import Main from './MainPage'
import NotFound from './NotFound'

const routes = (
  <div>
		<Layout>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/index"/>
        )}/>
		    <Route path='/index' component={ Main } />
		    <Route path='*' component={ NotFound } />
      </Switch>
    </Layout>
  </div>
)

export default routes
