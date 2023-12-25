import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import io from 'socket.io-client';
import { usersSelector } from '../../Redux/usersSlice';
import send from '../../assets/add_icon.svg';
import Comment from '../Comment/Comment';
import style from './sidebar.module.css';
const socket = io.connect('http://localhost:3000/')

const Users = ()=>{
    const users = useSelector(usersSelector)
   
      return(
        <div className={style.users}>
            <div className={style.title}>
              <span>Users</span>
            </div>
            <hr/>
            <div className={style.userList}>
                {
                    users.map((ele)=>{
                        return (<div className={style.profile}>
                             <img src={ele.photoUrl} className='userProfile' style={{margin:'0px'}}/>
                        <p>{ele.name}</p>
                    </div>)
                    })
                }
               
            </div>
        </div>
      )
}
const Comments = ()=>{
   const [comment,setComment]=useState('')
    const handleChange = (e)=>{
          setComment(e.target.value)
    }
    
    const handleSubmit = (e)=>{
      e.preventDefault()
      console.log(comment)
      socket.emit('send-comment',comment)
    }
    useEffect(()=>{
      socket.on('receive-comment',(data)=>{
        console.log(data)
      })
      return () => {
        socket.off('receive-comment'); // Clean up event listener on unmount
      };
    },[socket])
    
    return(
        <div className={style.comments}>
           <div className={style.first}>
             <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
           </div>
           <div className={style.form}>
            <form onSubmit={handleSubmit}>
                <input type='text' name='comment' onChange={handleChange} value={comment} required/>
                <button type='submit' className='btn btn-primary btn-lg'><img src={send}/></button>
            </form>

           </div>
            
        </div>
    )
}
const Sidebar = () => {
let children ;

if(window.location.pathname==='/'){
    
    children=<Users />
}else {
    children=<Comments />
}
  return (
    <div className={style.container}>
       {children}
    </div>
  );
}

export default Sidebar;
