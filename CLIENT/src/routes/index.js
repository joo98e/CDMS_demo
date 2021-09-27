import React, { Component } from 'react'
import { Route } from 'react-router-dom';

// Components
import Login from '../components/Pages/Login';
import Register from '../components/Pages/Register';
import Landing from '../components/Pages/Landing'
import Projects from '../components/Pages/Projects'

export class index extends Component {

    render() {
        return (
            <div>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/assistant/landing" component={Landing}></Route>
                <Route exact path="/assistant/projects" component={Projects}></Route>
            </div>
        )
    }
}

export default index
