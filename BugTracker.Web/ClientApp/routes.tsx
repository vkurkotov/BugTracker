import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/Account/Register';
import { LogIn } from './components/Account/LogIn';

export const routes = <Layout>
                          <Route exact path='/' component={ Home }/>
                          <Route path='/counter' component={ Counter }/>
                          <Route path='/fetchdata' component={FetchData}/>
                          <Route path='/account/register' component={Register}/>
                          <Route path='/account/login' component={LogIn}/>
                      </Layout>;
