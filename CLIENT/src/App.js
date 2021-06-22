import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// THEME
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import MyNav from './components/common/MyNav';
import SettingsMenu from './components/common/SettingsMenu';

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

          <MyNav />

          <Box
            display="flex"
            style={{ position: "relative", minHeight: "100vh", background: this.props.theme.palette.background.default }}
          >

            {/* ─────────────────────────────────────────────────────────────────────── Route */}
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            {/* ─────────────────────────────────────────────────────────────────────── Route */}

          </Box>

          <SettingsMenu />
        </BrowserRouter>
      </ThemeProvider>

    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(App);
