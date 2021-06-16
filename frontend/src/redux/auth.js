import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: null,
    isAdmin: null,
    menu: '',
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess(state, action) {
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
            state.menu = action.payload.isAdmin ? 'admin' : 'normaluser';
        },
        logout(state, action) {
            state.isAdmin = null;
            state.token = null;
            state.menu = '';
        },
    },
});

export const login =
    ({ userName, passWord }) =>
    async dispatch => {
        const res = await axios.post(
            'http://localhost:3001/api/v1/auth/signin',
            {
                userName,
                passWord,
            }
        );
        const { token, isAdmin } = res.data;
        dispatch(signInSuccess({ token, isAdmin }));
    };

export const { signInSuccess, logout } = auth.actions;
export default auth.reducer;
