import React from 'react';
import { usePhotoUrls } from '../../hooks/usePhotoUrls';
import style from './largecard.module.css';
const LargeCard = ({assigner,description,dueDate,id,isComplete,title}) => {
 
    const [photoUrls] = usePhotoUrls(id)
  return (
    <div className={style.card}>
        <div className={style.details}>
            <span className={style.title}>{title}</span>
            <span className={style.by}>by {assigner}</span>
           
            <span className={style.date}>Project due by {(new Date(dueDate)).toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        })}</span>
        </div>
        <hr/>
        <div className={style.description}>
                <p>{description}</p>
        </div>
        <div className={style.user}>
               <span>Project assigned to: </span>
               <div className='d-flex'>
                 {photoUrls.map((obj)=>{
                  return <img src={obj.photoUrl} className='userProfile'/>
                 })}
                  
               </div>
        </div>
        <div className='mt-4'>
          {isComplete==1?<div></div>:<button className='btn btn-primary btn-lg'>Completed</button>}
        </div>
    </div>
  );
}

export default LargeCard;
