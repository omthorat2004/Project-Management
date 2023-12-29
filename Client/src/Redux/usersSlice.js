import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getUsers = createAsyncThunk("getUsers",async ()=>{
    try{
    const response = await fetch("http://localhost:3000/getUsers",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
          
        }
    })
    const data = await response.json()
    // console.log(token)
    return data
    }catch(err){
        return rejectWithValue(err)
    }
})
const usersSlice = createSlice({
    name:"users",
    initialState:{
        loading:false,
        users:[],
        message:'',
        error:false
    },
    reducers:{
        setInitialValue:(state,action)=>{
            state.loading=false
            state.error=false
            state.message=''
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state,action)=>{
            state.loading=true
            
        })
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            if(action.payload.error){
                state.error=true
                state.message=action.payload.error
            }else{
                state.users=action.payload.users
                state.loading=false
                // console.log(state.users)
            }
        })
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.error=true
            state.loading=false
            console.log("Hello")
            state.message="Server problem"
        })
    }
    
})

export const loadingSelector = (state)=> state.users.loading

export const errorSelector = (state)=> state.users.error

export const usersSelector = (state)=> state.users.users

export const messageSelector = (state)=> state.users.message

export const {setInitialValue} = usersSlice.actions

export default usersSlice.reducer