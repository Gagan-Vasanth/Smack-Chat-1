import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/store';


const firebaseConfig = {
  apiKey: "AIzaSyA8ElGK8DyZNzbC32jk0mlxzpJfA7i79ZM",
  authDomain: "web-chat-abd11.firebaseapp.com",
  projectId: "web-chat-abd11",
  storageBucket: "web-chat-abd11.appspot.com",
  messagingSenderId: "604488516106",
  appId: "1:604488516106:web:8f2644400392dded8a55f3",
  measurementId: "G-BCH0BLLWVS"
};

firebase.initializeApp(firebaseConfig);



window.store = store;

ReactDOM.render(
  <Provider store = {store}>
      <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
