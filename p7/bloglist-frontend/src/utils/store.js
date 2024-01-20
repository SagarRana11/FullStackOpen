import { createStore, applyMiddleware, combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../reducers/userReducer';
import authReducer from '../reducers/authReducer';
import blogReducer from '../reducers/blogReducer';
import notificationReducer from '../reducers/notificationReducer';

const store = configureStore({
  reducer: {
    user: authReducer,
    users: userReducer,
    blog: blogReducer,
    notification: notificationReducer
  }

});




export default store;