import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider } from "react-redux";
import bankAccountStore from "./store/BankAccountStore";
import App from './App.BankAccountRedux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
      <Provider store={bankAccountStore}>
        <App />
      </Provider>
  </React.StrictMode>
);

