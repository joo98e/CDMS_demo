import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// THEME
import { Box, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Routes from './routes'
import MyNav from './components/common/MyNav';
import UISettingsMenu from './components/common/UISettingsMenu';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  myNav = () => {
    return (
      this.props.user.auth && (
        <Box>
          {this.props.user.auth &&
            <MyNav />
          }
        </Box>
      )

    )
  }

  doRedirect = () => {
    return (
      <>
        {
          this.props.user.auth ?
            <Redirect
              to={{
                pathname: "/assistant/landing",
                state: {
                  from: this.props.location,
                },
              }}
            />
            :
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: this.props.location,
                },
              }}
            />
        }
      </>
    )
  }

  render() {

    return (

      <ThemeProvider theme={this.props.theme} >
        {this.myNav()}
        <Box
          pt={this.props.user.auth ? 10 : 0}
          style={{
            position: "relative",
            height: "100vh",
            background: this.props.theme.palette.background.default,
            color: this.props.theme.palette.text.primary
          }}
        >
          {this.doRedirect()}
          <Routes />
        </Box>
        <UISettingsMenu />
      </ThemeProvider>

    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  user: state.user
});

export default connect(mapStateToProps)(App);
