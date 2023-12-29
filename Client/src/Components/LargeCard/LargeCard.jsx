import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { currentUserSelector } from '../../Redux/authenticationSlice';
import style from './largecard.module.css';
const LargeCard = ({assigner,description,dueDate,id,title,usersId,url}) => {
    const [isUserAssigned,setUserAssigned] = useState(false)
    const [photoUrls,setPhotoUrls] = useState([])
    // const [photoUrls] = usePhotoUrls(id)
    // console.log(photoUrls)
    // const dispatch = useDispatch()
    console.log(isUserAssigned)
    const currentUser = useSelector(currentUserSelector)
    useEffect(()=>{
      const array = usersId.split(', ')
      console.log(array)
      const user = array.find((obj)=> Number(obj)===currentUser.id)
      console.log(user)
     if(user){
      setUserAssigned(true)
     }
     setPhotoUrls(url.split(', '))
    },[id])

    const handleClick = ()=>{
      Swal.fire({
        title: "Do you really completed project?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    
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
                 {photoUrls.map((ele)=>{
                  return <img src={ele} className='userProfile'/>
                 })}
                  
               </div>
        </div>
        <div className='mt-4'>
          {!isUserAssigned?<div></div>:<button className='btn btn-primary btn-lg' onClick={handleClick}>Completed</button>}
        </div>
    </div>
  );
}

export default LargeCard;
