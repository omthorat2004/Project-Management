import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk("sign",async(body,{rejectWithValue})=>{
    try{const response = await fetch("http://localhost:3000/sign",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
    })
    const data = await response.json()
    return data
}catch(err){
    return rejectWithValue(err)
}
})
export const login = createAsyncThunk("login",async(body,{rejectWithValue})=>{
    try{
        const response = await fetch("http://localhost:3000/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
        const data = await response.json()
        return data
    }catch(err){
        console.log(err.type)
        return rejectWithValue(err)
    }
})

export const signGoogle = createAsyncThunk("signGoogle",async(body,{rejectWithValue})=>{
    try{
        const response = await fetch("http://localhost:3000/signGoogle",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
        const data = await response.json()
        return data
    }catch(err){
        return rejectWithValue(err)
    }
})

export const userVerification  = createAsyncThunk("userVerification",async(token,{rejectWithValue})=>{
       try{
        const response = await fetch("http://localhost:3000/userVerification",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authentication":token
            }
        })
        const data = await response.json()
        console.log(token)
        return data
       }catch(err){
        return rejectWithValue(err)

       }
})

const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        loading:false,
        success:false,
        token:localStorage.getItem('token'),
        currentUser:JSON.parse(localStorage.getItem('currentUser')),
        error:false,
        message:'',
        userValid:true
    },
    reducers:{
        logOut:(state,action)=>{
            localStorage.removeItem("token");
            localStorage.removeItem('currentUser')
            state.currentUser=null
            state.token=null
            state.userValid=false
        },
        setInitialState:(state,action)=>{
            state.loading=false
            state.error=false
            state.message=''
            state.success=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUp.pending,(state,action)=>{
            state.loading = true
            
        })
        builder.addCase(signUp.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload.error){
                state.error=true
                state.message=action.payload.error
            }else{
                localStorage.setItem('token',action.payload.token)
                localStorage.setItem('currentUser',action.payload.user)
                state.success=true
                state.userValid=true
                state.token = action.payload.token
                state.currentUser = action.payload.user
            }
        })
        builder.addCase(signUp.rejected,(state,action)=>{
            state.error = true
            state.message="Server Error"
            console.error(action.payload)
        })
        builder.addCase(login.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload.error){
                state.error=true
                state.message=action.payload.error
            }else{
                state.currentUser=action.payload.user
                state.token=action.payload.token
                localStorage.setItem('currentUser',JSON.stringify(action.payload.user))
                localStorage.setItem('token',action.payload.token)
                state.success=true
                state.userValid=true
            }
        })
        builder.addCase(login.rejected,(state,action)=>{
            console.log("Rejected")
            state.error=true
            state.message="Server Error"
        })
        builder.addCase(signGoogle.fulfilled,(state,action)=>{
            state.currentUser=action.payload.user
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('currentUser',action.payload.user)
        })
        builder.addCase(signGoogle.rejected,(state,action)=>{
            state.error=true
            state.message="Server Error"
        })
        builder.addCase(userVerification.fulfilled,(state,action)=>{
            const {valid} = action.payload
            if(valid){
                state.userValid=true
            }else{
                state.userValid=false
                localStorage.removeItem('token')
                localStorage.removeItem('currentUser')
                state.currentUser=null
                state.token=null

            }
        })
}

})

export const tokenSelector = (state)=>state.auth.token

export const errorSelector = (state)=>state.auth.error

export const messageSelector = (state)=>state.auth.message

export const successSelector = (state)=> state.auth.success

export const currentUserSelector = (state)=> state.auth.currentUser

export const userValidSelector = (state)=>state.auth.userValid



export const {setInitialState,logOut} = authenticationSlice.actions

export default authenticationSlice.reducer