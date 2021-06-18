import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './fonts/fonts.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
