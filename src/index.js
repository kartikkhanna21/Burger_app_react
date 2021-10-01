import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './containers/Store/reducers/auth';
import thunk from 'redux-thunk'; //redux - thunk

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //used for using react devtools here compose comes from redux...also advanced store code used as middleware is used

const store=createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}><App /></Provider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
