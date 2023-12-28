import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import LargeCard from '../../Components/LargeCard/LargeCard';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { errorSelector, getComments, loadingSelector, messageSelector, setInitialValue } from '../../Redux/commentSlice';
import { projectsSelector } from '../../Redux/projectsSlice';
import style from './project.module.css';
const Project = () => {
  const loading = useSelector(loadingSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(errorSelector)
  const message = useSelector(messageSelector)
  const [project,setProject]= useState(null)
  const projects = useSelector(projectsSelector)
  let {id} = useParams()
  id=Number(id)
  //  console.log(projectUsers)
  // console.log(users)
  useEffect(()=>{
    setProject(projects.find((ele)=>ele.id===id))
    dispatch(getComments({id:id}))
  },[id,projects])
  // console.log(usersPhoto)
  useEffect(()=>{
    if(error){
    Swal.fire({
      title:"Server Error",
      icon:"error"
    })
    dispatch(setInitialValue())
    navigate('/')
  }
  },[error,navigate,dispatch])
  return (
    <div className={style.container}>
      <div className={style.left}>
        <LargeCard {...project}  />
      </div>
      <div className={style.right}>
        <Sidebar />
    
      </div>
    </div>
  );
}

export default Project;
