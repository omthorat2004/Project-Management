import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjects = createAsyncThunk("getProjects",async ()=>{
    const response = await fetch("http://localhost:3000/getProjects")
    const data = await response.json()
    return data
})

export const deleteProject = createAsyncThunk("deleteProject",async(body)=>{
    const response = await fetch(`http://localhost:3000/delete${body.id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    const data = await response.json()
    return data
})
export const addProject = createAsyncThunk("createProject",async(body)=>{
    const response = await fetch("http://localhost:3000/createProject",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    const data = await response.json()
    return data
})

export const getProjectUsers = createAsyncThunk("getProjectUsers",async({id},{rejectWithValue})=>{
    try{const response = await fetch(`http://localhost:3000/project/${id}`)
    const data = await response.json()
    return data 
    }catch(err){
      return rejectWithValue(err)
    }
})

export const getPhotoUrls = createAsyncThunk("getPhotoUrls ",async()=>{
    try{
        const response = await fetch("http://localhost:3000/projectUserUrl")
        const data = await response.json()
        return data

    }catch(err){
        return err
    }
})
const projectsSlice = createSlice({
    name:"Projects",
    initialState:{
        loading:false,
        currentProjectUsers:[],
        photoUrls:[],
        projects:[],
        message:'',
        error:false,
        success:false,
       
    },
    reducers:{
        setCurrentProject:(state,action)=>{
            const project = state.projects.find((obj)=> obj.id===action.payload.id)
            state.currentProject = project
        },
        removeCurrentProject:(state,action)=>{
            state.currentProject = {}
        },
        setInitialState:(state,action)=>{
            state.error=false
            state.loading=false
            state.message=''
            state.success=false
        },
        setPhotoUrls:(state,action)=>{
            // const {users} = action.payload
            // console.log(users)
            // // console.log(state.currentProjectUsers)
            // const array = state.currentProjectUsers.map((obj)=>{
            //     const foundUser = users.find((ele)=>ele.id===obj.userId)
            //     if(foundUser){
            //       return {url:foundUser.photoUrl}
            //     }else{
            //       return null
            //     }
            //    }).filter((obj)=> obj!==null)
            //    state.photoUrls = array
            //    console.log(array)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProjects.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getProjects.fulfilled,(state,action)=>{
            if(action.payload.error){
                state.error=true
                state.message=action.payload.error
            }else{
                console.log("projects",action.payload)
                state.projects=action.payload.projects
            }
            state.loading=false
        })
        builder.addCase(getProjects.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message="Something Went Wrong"
        })

        builder.addCase(deleteProject.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(deleteProject.fulfilled,(state,action)=>{
            if(action.payload.error){
                state.error=true
                state.message=action.payload.error
            }else{
                state.projects = state.projects.filter((obj)=> obj.id!==action.payload.id)
                // state.currentProject = {}
            }
            state.loading=false
        })
        builder.addCase(deleteProject.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message="Something Went Wrong"
        })
        builder.addCase(addProject.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(addProject.fulfilled,(state,action)=>{
            const {message,success} = action.payload
            state.message=message
            state.success=true
            state.loading=true
            state.projects = [...state.projects,action.payload.project]
        })
        builder.addCase(addProject.rejected,(state,action)=>{
            state.error=true
            state.message="Server Error"
        })
        builder.addCase(getProjectUsers.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getProjectUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.currentProjectUsers = action.payload.result
        })
        builder.addCase(getPhotoUrls.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getPhotoUrls.fulfilled,(state,action)=>{
            state.loading = false
            state.photoUrls = action.payload.result
        })


}})

export const loadingSelector = (state)=> state.projects.loading

export const errorSelector = (state)=> state.projects.error

export const projectsSelector = (state)=> state.projects.projects

export const currentProjectUsersSelector = (state)=> state.projects.currentProjectUsers

export const messageSelector = (state)=> state.projects.message

export const successSelector = (state)=>state.projects.success

export const photoUrlsSelector = (state)=>state.projects.photoUrls



export const {addProjectsState,setPhotoUrls,setInitialState} = projectsSlice.actions

export default projectsSlice.reducer