import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import RESTCalls from './components/RESTCalls';
import JsonEdit from './components/JsonEdit';
import CreateDataSource from './components/CreateDataSource';
import CreateEntity from './components/CreateEntity';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/restcalls' component={RESTCalls} />
    <Route path='/jsonedit' component={JsonEdit} />
    <Route path='/createdata' component={CreateDataSource} />
    <Route path='/createentity' component={CreateEntity} />
  </Layout>
);
