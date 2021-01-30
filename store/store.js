import { useReducer } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducer/auth.reducer';
import usersReducer from '../reducer/users.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;