import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let defaultState = {
  cartData:[],
  isUserLogged:false
};

function reducer(state = defaultState, action) {
  console.log('action',action);
  switch (action.type) {
    case 'userLoggedIn': {
      return {
        ...state,
        cartData:[],
        isUserLogged:action.payload.isUserLogged
      };
    }

    case 'addToCart': {
      let sameProductIndex = state.cartData.findIndex((d) => {
        return d.id === action.payload.id;
      });
      if (sameProductIndex >= 0) {
        let copyState = {...state};
        copyState.cartData[sameProductIndex].qty += parseInt(action.payload.qty);
        return copyState;
      } else {
        let copyState = {...state};
        copyState.cartData.push(action.payload);
        return copyState;
      }
    }

    case 'increase': {
      let sameProductIndex = state.cartData.findIndex((d) => {
        return d.id === action.payload;
      });
      if (sameProductIndex >= 0) {
        let copyState = {...state};
        copyState.cartData[sameProductIndex].qty++;
        return copyState;
      } else {
        return state;
      }
    }
    case 'decrease': {
      let sameProductIndex = state.findIndex((d) => {
        return d.id === action.payload;
      });
      if (sameProductIndex >= 0) {
        let copyState = {...state};
        if (copyState.cartData[sameProductIndex].qty <= 0) {
          copyState.cartData[sameProductIndex].qty = 0;
          return copyState;
        }
        copyState.cartData[sameProductIndex].qty--;
        return copyState;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

let store = createStore(combineReducers({ reducer }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
