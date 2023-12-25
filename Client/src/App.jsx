import { useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import { currentUserSelector } from './Redux/authenticationSlice'
import { getPhotoUrls, getProjects, projectsSelector } from './Redux/projectsSlice'
import { getUsers, loadingSelector } from './Redux/usersSlice'
import Form from './pages/Form/Form'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Project from './pages/Project/Project'
import Sign from './pages/Sign/Sign'
function App() {
  const dispatch = useDispatch()
  const projects = useSelector(projectsSelector)
  const user = useSelector(currentUserSelector)
  const loading = useSelector(loadingSelector)
  useEffect(()=>{
        dispatch(getUsers())
        dispatch(getProjects())
        dispatch(getPhotoUrls())
  },[user])
  

  if(loading){
    return(<div className='loading'><Spinner animation="border"/></div>)
  }else{
  return (
    <>
      <Router>
        <Navbar/>
       
          <Routes>
            <Route path='/sign' element={<Sign/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path='/form' element={<PrivateRoute><Form/></PrivateRoute>}/>
            <Route path='/project/:id' element={<PrivateRoute><Project/></PrivateRoute>}/>
          </Routes>
      
      </Router>
    </>
  
  )
  }
}

export default App
