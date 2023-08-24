import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        refreshUser(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, refreshUser } = authSlice.actions;

export default authSlice.reducer;
