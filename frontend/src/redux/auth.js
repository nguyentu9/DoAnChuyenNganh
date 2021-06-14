import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: null,
    isAdmin: null,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess(state, action) {
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
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

export const { signInSuccess } = auth.actions;
export default auth.reducer;
