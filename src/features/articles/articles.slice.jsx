import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = `${import.meta.env.VITE_APP_SERVERURL}/posts`;

const initialState = {
  articles: [],
  status: 'idle', 
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articleAdded(state, action) {
      state.articles.push(action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.articles = state.articles.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.articles.push(action.payload.data);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialState) => {
  const response = await axios.post(POSTS_URL, initialState)
  return response;
})

export const editPost = createAsyncThunk('posts/editPost', async (data) => {
  console.log('edit data in the async thunk: ', data.editData)

  const response = await axios.put(
    `${POSTS_URL}/${data.id}`, 
    data.editData, 
    {
      headers: { 'Content-Type': 'application/json' }
    } 
  );

  return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (data) => {
  console.log('the data in the delete post thunk: ', data)
  console.log('the id in the data: ', data.id)

  const response = await axios.delete(
    `${POSTS_URL}/${data.id}`,
      {
          headers: { 'Content-Type': 'application/json' },
      },
  );

  return response
});

export const selectAllArticles = (state) => state.articles.articles;
export const getArticlesStatus = (state) => state.articles.status;
export const getArticlesError = (state) => state.articles.error;

export const selectArticleById = (state, articleId) => state.articles.articles.find(article => article.id === articleId);

export const selectArticleByUserEmail = createSelector(
  (state) => state.articles.articles,
  (_, userEmail) => userEmail,
  (articles, userEmail) => articles.filter((article) => article.user_email === userEmail)
)

export const { articleAdded } = articlesSlice.actions;

export default articlesSlice.reducer;
