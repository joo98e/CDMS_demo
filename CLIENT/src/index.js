import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './css/init.css';
import './css/mediaQuery.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { CssBaseline } from "@material-ui/core";
import UISnackBar from './components/common/UISnackBar';


const store = createStore(reducers);
// store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} action={(key) => (<UISnackBar goods={key} />)} >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
