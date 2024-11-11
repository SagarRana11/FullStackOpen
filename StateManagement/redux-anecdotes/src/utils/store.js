import filterReducer from "../reducers/filterReducer";
import notificationReducer from "../reducers/notificationReducer";
import anecdoteReducer from "../reducers/anecdoteReducer";
import {configureStore} from '@reduxjs/toolkit'


const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter : filterReducer
    }
})

export default store

