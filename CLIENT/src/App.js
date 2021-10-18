import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import CustomRoute from './components/common/CustomRoutes'
import Redirection from './components/Pages/Redirection';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Landing from './components/Pages/Landing'
import Project from './components/Pages/_old_Project'
import Agency from './components/Pages/Agency'
import AgencyDetail from './components/Pages/Agency/Detail'
import ProjectDetail from './components/Pages/Proj/Detail'
import ProcessAdd from './components/Pages/Process/ProcessAdd'
import PageNotFound from './components/Pages/Error/404'

class App extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/register" component={Register} />
        <CustomRoute exact path="/landing" component={Landing} />
        <CustomRoute exact path="/project" component={Project} />
        <CustomRoute exact path="/agency" component={Agency} />
        <CustomRoute exact path="/agency/detail/:ref_agcy_id" component={AgencyDetail} />
        <CustomRoute exact path="/agency/project/detail/:ref_proj_id" component={ProjectDetail} />
        <CustomRoute exact path="/agency/project/detail/process/add/:ref_proj_id" component={ProcessAdd} />
        <CustomRoute component={Redirection} />
      </Switch>
    )
  }
}

export default (App);
