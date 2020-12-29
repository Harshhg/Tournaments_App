import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
const options = {
  offset: '30px' ,
  position:'middle', 
  timeout: 12000, 
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <Routes />
  </AlertProvider>,
    
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
