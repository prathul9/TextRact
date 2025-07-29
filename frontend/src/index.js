// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { UserProvider } from './UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
