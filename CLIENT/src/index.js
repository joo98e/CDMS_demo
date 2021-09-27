import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './common/css/init.css';
import './common/css/mediaQuery.css';

import { Provider } from 'react-redux';
import Store from './redux/Store'
import { CssBaseline } from "@material-ui/core";
import UISnackBar from './components/common/UISnackBar';

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
        <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} action={(key) => (<UISnackBar goods={key} />)} >
          <CssBaseline />
          <App />
        </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
