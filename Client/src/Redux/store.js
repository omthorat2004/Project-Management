import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationSlice.js'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'
const store = configureStore({
    reducer:{
        users:usersReducer,
        projects:projectsReducer,
        auth:authenticationReducer
    }
})
export default store