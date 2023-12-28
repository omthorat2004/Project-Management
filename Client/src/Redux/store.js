import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationSlice.js'
import commentReducer from './commentSlice.js'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'
const store = configureStore({
    reducer:{
        users:usersReducer,
        projects:projectsReducer,
        auth:authenticationReducer,
        comments:commentReducer
    }
})
export default store