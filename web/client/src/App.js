import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import RESTCalls from './components/RESTCalls';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/restcalls' component={RESTCalls} />
  </Layout>
);
