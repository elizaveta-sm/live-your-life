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

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);

