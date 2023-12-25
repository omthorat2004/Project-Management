import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LargeCard from '../../Components/LargeCard/LargeCard';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { AuthContext } from '../../Context/Context';
import { currentProjectUsersSelector, projectsSelector } from '../../Redux/projectsSlice';
import { usersSelector } from '../../Redux/usersSlice';
import style from './project.module.css';
const Project = () => {
  const {setId} = useContext(AuthContext)
  const users = useSelector(usersSelector)
  const projectUsers = useSelector(currentProjectUsersSelector)
 
  let {id} = useParams()
  id = Number(id)
  const [project,setProject]= useState(null)
  const projects = useSelector(projectsSelector)
  //  console.log(projectUsers)
  // console.log(users)
  
  useEffect(()=>{
    setProject(projects.find((ele)=>ele.id===id))
    setId(id)
  },[id,projects])
  // console.log(usersPhoto)
 
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
