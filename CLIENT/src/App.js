import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// THEME
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {

    return (

      <ThemeProvider theme={this.props.theme} >
        <BrowserRouter >
          <Box style={{ position:"relative", minWidth: "100vw", minHeight: "100vh", background: this.props.theme.palette.background.default }}>

            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>

          </Box>
        </BrowserRouter>
      </ThemeProvider>

    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(App);
