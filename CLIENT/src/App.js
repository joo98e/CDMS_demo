import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import CustomRoute from './components/common/CustomRoutes'
import Redirection from './components/Pages/Redirection';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Landing from './components/Pages/Landing'
import Projects from './components/Pages/Projects'
import PageNotFound from './components/Pages/Error/404'

class App extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/register" component={Register} />
        <CustomRoute exact path="/landing" component={Landing} />
        <CustomRoute exact path="/projects" component={Projects} />
        <CustomRoute component={Redirection} />
        <CustomRoute path="*" component={PageNotFound} />
      </Switch>
    )
  }
}

export default (App);
