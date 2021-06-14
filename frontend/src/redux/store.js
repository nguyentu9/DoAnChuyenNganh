import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from './auth';

const reducer = combineReducers({
    auth: authReducer,
});
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['auth']
}

const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
    reducer:persistedReducer,
    devTools: true,
});

export const persistor = persistStore(store);

export default store;
