import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const createComment = createAsyncThunk("createProject",async(body,{rejectWithValue})=>{
    try{
        const response = await fetch("http://localhost:3000/createComment",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify(body)
        })
        const data = await response.json()
        return data
    }catch(err){
        return rejectWithValue(err)
    }
})
    
const getComments = createAsyncThunk("getComments",async ({rejectWithValue})=>{
    try{
       const response = await fetch("http://localhost:3000/getComments")
       const data = response.json()
       return data
    }catch(err){
     return rejectWithValue(err)
    }
})

const commentSlice = createSlice({
    name:"comments",
    initialState:{
        loading:false,
        error:false,
        message:'',
        comments:[]
    },
    reducers:{
        addComment:(state,action)=>{
            state.comments = [...state.comments,action.payload]
        }
    },
    extraReducers:(builder)=>{
          builder.addCase(createComment.pending,(state,action)=>{
            state.loading=true
          })
          .addCase(createComment.fulfilled,(state,action)=>{
            const {error,success} = req.body
            if(error){
                state.error = true
                state.message=error
            }
          })
          .addCase(createComment.rejected,(state,action)=>{
            
            state.error=true
            state.message="Server Error"
          })

    }
})