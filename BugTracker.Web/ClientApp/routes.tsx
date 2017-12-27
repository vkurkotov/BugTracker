import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/account/register/register.component';
import { LogIn } from './components/account/login/logIn.component';

export const routes = <Layout>
                          <Route exact path='/' component={ Home }/>
                          <Route path='/counter' component={ Counter }/>
                          <Route path='/fetchdata' component={FetchData}/>
                          <Route path='/account/register' component={Register}/>
                          <Route path='/account/login' component={LogIn}/>
                      </Layout>;
