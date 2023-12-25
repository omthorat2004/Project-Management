import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './Redux/store.js';
import './index.css';
// Filename - index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import Context from './Context/Context.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Context>
    <App />
    </Context>
    </Provider>
  </React.StrictMode>
  ,
)
