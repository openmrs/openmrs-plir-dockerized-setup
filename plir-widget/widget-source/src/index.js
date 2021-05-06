import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './carbon-components.css';
import '@carbon/grid/scss/grid.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('tx-pvls-widget')
);


reportWebVitals();
