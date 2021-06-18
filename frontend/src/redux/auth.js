import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: null,
    isAdmin: null,
    menu: '',
    _id: '',
    fullName: '',
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess(state, action) {
            let { token, isAdmin, _id, fullName } = action.payload;
            state._id = _id;
            state.fullName = fullName;
            state.token = token;
            state.isAdmin = isAdmin;
            state.menu = isAdmin ? 'admin' : 'normaluser';
        },
        logout(state, action) {
            state.isAdmin = null;
            state.token = null;
            state.menu = '';
            state._id = '';
            state.fullName = '';
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
        dispatch(signInSuccess(res.data));
    };

export const { signInSuccess, logout } = auth.actions;
export default auth.reducer;
