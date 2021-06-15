import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

console.log(store.getState());

// store에 상태 변화가 일어날 때마다 subscribe 의 리스너, 콘솔이 출력된다.
// store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
