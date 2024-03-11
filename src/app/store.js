import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articles.slice';
import usersReducer from '../features/users/users.slice.jsx';

export const store = configureStore({
    reducer: {
        articles: articlesReducer,
        users: usersReducer,
    },
});