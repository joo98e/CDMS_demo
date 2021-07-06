import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './css/init.css';
import './css/mediaQuery.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
