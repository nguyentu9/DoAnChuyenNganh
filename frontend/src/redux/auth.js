import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    token: null
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess(state, action) {
            state.token = action.payload;
        }
    }  
})

export const login = ({ userName, passWord}) => async dispatch => {
    const res = await axios.post('http://localhost:3001/api/v1/auth/signin', {
        userName,
        passWord
    })
    dispatch(signInSuccess(res.data.token));
}

export const { signInSuccess } = auth.actions;
export default auth.reducer;