import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotoUrls } from '../../hooks/usePhotoUrls';
import style from './card.module.css';
const Card = ({title,dueDate,id}) => {
  const navigate = useNavigate()
  // const [currentProjectUrls,setCurrent] = useState()
  // const {urls} =useContext(AuthContext)
  const [photoUrls] = usePhotoUrls(id)
  // useEffect(()=>{
  //       setCurrent(urls.filter((obj)=>id==obj.id))
  // },[urls])
  const handleClick = ()=>{
    navigate(`/project/${id}`)
  }
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
              return <img src={obj.photoUrl} className='userProfile'/>
            })}
        </div>
      </div>
 
  );
}

export default Card;
