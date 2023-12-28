import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../Components/Card/Card.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { tokenSelector } from '../../Redux/authenticationSlice.js';
import { projectsSelector } from '../../Redux/projectsSlice.js';
import { errorSelector, messageSelector, usersSelector } from '../../Redux/usersSlice.js';

import style from './home.module.css';
const Home = () => {

  const users = useSelector(usersSelector)
  const token = useSelector(tokenSelector)
  const projects = useSelector(projectsSelector)
  const error = useSelector(errorSelector)
  const message = useSelector(messageSelector)
  console.log(projects)
  
  
   
  
  return (
    <div className={style.div}>
      <div className={style.button}>
        <Link className='btn btn-primary' to='/form'>New Project +</Link>
        <hr/>
      </div>
      <div className={style.container} >
      
      <div className={style.left}>
        {projects.map((ele)=>{
          return ( <Card key={ele.id} id={ele.id} title={ele.title} dueDate={(new Date(ele.dueDate)).toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })}/>)
        })}
        
      </div>
      <div className={style.right}>
        <Sidebar  />
      </div>
    </div>
    </div>
  );
}

export default Home;
