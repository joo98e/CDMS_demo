import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/SignIn';

export class App extends Component {

  render() {

    return (
      <BrowserRouter>

        <Route exact path="/" component={SignIn}></Route>
        

      </BrowserRouter>
    )
  }
}

export default App
