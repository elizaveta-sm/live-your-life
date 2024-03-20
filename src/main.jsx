import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';

import { store } from './app/store';
import { Provider } from 'react-redux';

import { fetchUsers } from './features/users/users.slice.jsx';
import { fetchPosts } from './features/articles/articles.slice.jsx';

import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from './context/toast.context.jsx';

import('preline');
import './index.css';
import { UserProvider } from './context/user.context.jsx';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ToastProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ToastProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);

