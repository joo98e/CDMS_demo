import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';

import App from './App';
import './css/init.css';
import './css/mediaQuery.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import UISnackBar from './components/common/UISnackBar';


const store = createStore(reducers);
// store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      // preventDuplicate, 중복 허용하지 않음
      action={(key) => (
        <UISnackBar goods={key}/>
      )}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
