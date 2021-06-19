import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// THEME
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import SignIn from './components/SignIn';

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
          <Box style={{ position:"relative", width: "100vw", height: "100vh", background: this.props.theme.palette.background.default }}>

            <Route exact path="/" component={SignIn}></Route>

          </Box>
        </BrowserRouter>
      </ThemeProvider>

    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  bgColor: state.ui.bgColor
});

export default connect(mapStateToProps)(App);
