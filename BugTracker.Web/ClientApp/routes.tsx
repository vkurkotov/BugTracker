import * as React from 'react';
import { Route, Redirect, NavLink, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/account/register/register.component';
import { LogIn } from './components/account/login/logIn.component';
import { LogOut } from './components/account/logout/logout.component';
import { Utils } from "./utils";

const AuthenticatedRoute = (properies: any) => {
  const { component: Component, ...rest } = properies;

  return <Route {...rest} render={props => (
    Utils.isAuthenticated()
      ? (<Component {...props} />)
      : (<Redirect to={{
        pathname: '/account/login',
        state: { from: props.location }
      }} />
      )
  )}/>;
}

const NotAuthenticatedRoute = (properies: any) => {
  const { component: Component, ...rest } = properies;

  return <Route {...rest} render={props => (
    !Utils.isAuthenticated()
      ? (<Component {...props} />)
      : (<Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
      )
  )}/>;
}

const NoMatch = (location: any) => (
  <div>
    <h3>Error 404 - Page not FOUND</h3>
    <NavLink to={'/'} exact activeClassName='active'>Home</NavLink>
  </div>
);

export const routes = <Layout>
                        <Switch>
                          <AuthenticatedRoute exact path='/' component={Home}/>
                          <AuthenticatedRoute path='/counter' component={Counter}/>
                          <AuthenticatedRoute path='/fetchdata' component={FetchData}/>
                          <AuthenticatedRoute path='/account/logout' component={LogOut}/>
                          <NotAuthenticatedRoute path='/account/register' component={Register}/>
                          <NotAuthenticatedRoute path='/account/login' component={LogIn}/>
                          <Route component={NoMatch}/>
                        </Switch>
                      </Layout>;