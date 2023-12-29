import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './card.module.css';
const Card = ({title,dueDate,id,urls}) => {
  const navigate = useNavigate()
  // const [currentProjectUrls,setCurrent] = useState()
  // const {urls} =useContext(AuthContext)
  // const [photoUrls] = usePhotoUrls(id)
  // useEffect(()=>{
  //       setCurrent(urls.filter((obj)=>id==obj.id))
  // },[urls])
  const [photoUrls,setPhotoUrls] = useState([])
  const handleClick = ()=>{
    navigate(`/project/${id}`)
  }
  
  useEffect(()=>{
    setPhotoUrls(urls.split(', '))
  },[id])
  return (
  
      <div className={style.card} onDoubleClick={handleClick}>
        <div className={style.cardInfo}>
          <div>
            <span className={style.title}>{title}</span>
          </div>  
            <span className={style.date}>Due by {dueDate}</span>
        </div>
        <hr/>
        <div className={style.users}>
            {photoUrls.map((obj)=>{
              return <img src={obj} className='userProfile'/>
            })}
        </div>
      </div>
 
  );
}

export default Card;
