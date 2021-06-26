import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// THEME
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

// import MyNav from './components/common/MyNav';
import SettingsMenu from './components/common/SettingsMenu';

import Landing from './components/Landing';
import Login from './components/Login';
// import Register from './components/Register';

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
          <Box
            style={{
              position: "relative",
              minHeight: "100vh",
              background: this.props.theme.palette.background.default,
              color: this.props.theme.palette.text.primary
            }}
          >

            {
              this.props.auth ?
                <Redirect
                  to={{
                    pathname: "/Landing",
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

            <Route exact path="/Landing" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>

            {/* <MyNav /> */}

          </Box>
          <SettingsMenu />

          {/* <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route> */}

        </BrowserRouter>
      </ThemeProvider>

    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  auth: state.user.auth
});

export default connect(mapStateToProps)(App);
