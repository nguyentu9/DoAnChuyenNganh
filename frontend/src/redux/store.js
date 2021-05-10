import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

const reducer = combineReducers({
    auth: authReducer,
})


const store = configureStore({
    reducer,
    devTools: true
})

export default store;