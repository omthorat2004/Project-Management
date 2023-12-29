import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createComment = createAsyncThunk("createComment",async(body,{rejectWithValue})=>{
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
    
export const getComments = createAsyncThunk("getComments",async ({id},{rejectWithValue})=>{
    try{
       const response = await fetch(`http://localhost:3000/getComments/${id}`)
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
        },
        setInitialValue:(state,action)=>{
            state.loading=false
            state.error=false
            state.comments=[]
            state.message=""
        }
    },
    extraReducers:(builder)=>{
          builder.addCase(createComment.pending,(state,action)=>{
            state.loading=true
          })
          .addCase(createComment.fulfilled,(state,action)=>{
            const {error,success} = action.payload
            state.loading=false
            if(error){
                state.error = true
                state.message=error
            }
          })
          .addCase(createComment.rejected,(state,action)=>{
            state.loading = false
            state.error=true
            state.message="Server Error"
          })
          .addCase(getComments.pending,(state,action)=>{
            state.loading=true
          })
          .addCase(getComments.fulfilled,(state,action)=>{
            state.loading = false

            state.comments=action.payload.result
        })
          .addCase(getComments.rejected,(state,action)=>{
            state.loading = false
            state.error=true
            state.message = "Server Error"
        })
    }
})

export const loadingSelector = (state)=>state.comments.loading

export const errorSelector = (state)=> state.comments.error

export const messageSelector = (state)=> state.comments.message

export const commentsSelector = (state)=>state.comments.comments

export const {addComment,setInitialValue} = commentSlice.actions

export default commentSlice.reducer