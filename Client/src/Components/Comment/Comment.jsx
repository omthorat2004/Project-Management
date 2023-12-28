import React from 'react';
import style from './comment.module.css';
const Comment = ({name,photoUrl,comment,projectId}) => {
  
  return (
    <div className={style.commentCard}>
          <div className={style.userInfo}>
              <img src={photoUrl} className='userProfile'/>
              <span className={style.userName}>{name}</span> </div>
        <span className={style.comment}>{comment}</span>
    </div>
  );
}

export default Comment;
