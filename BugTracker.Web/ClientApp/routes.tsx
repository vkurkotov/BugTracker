import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/account/register/register.component';
import { LogIn } from './components/account/login/logIn.component';
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

export const routes = <Layout>
                        <AuthenticatedRoute exact path='/' component={Home}/>
                        <AuthenticatedRoute path='/counter' component={Counter}/>
                        <AuthenticatedRoute path='/fetchdata' component={FetchData}/>
                        <NotAuthenticatedRoute path='/account/register' component={Register}/>
                        <NotAuthenticatedRoute path='/account/login' component={LogIn}/>
                      </Layout>;