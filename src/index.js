import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storeConfig from './store';
import Gousto from './Gousto';
import './styles/index.css';

const store = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <Gousto />
  </Provider>,
  document.getElementById('root')
);
