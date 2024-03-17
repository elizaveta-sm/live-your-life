import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const USERS_URL = `${import.meta.env.VITE_APP_SERVERURL}/users`;

const initialState = {
    users: [],
    status: 'idle', 
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);

    console.log('response: ', response)

    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const selectUserByEmail = (state, email) => {
    if (email.length) state.users.users.find(user => user.email === email);

    return undefined
};

export default usersSlice.reducer;