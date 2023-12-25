import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenSelector, userValidSelector, userVerification } from '../Redux/authenticationSlice';
const PrivateRoute = ({children}) => {
        const token = useSelector(tokenSelector)
        const userValid = useSelector(userValidSelector)
        const dispatch = useDispatch()
        const navigate = useNavigate()
        useEffect(()=>{
            if(!token ){
                navigate('/login')
            }else if(token && userValid) {
                dispatch(userVerification(token))
            }else{
                navigate('/login')
            }
        },[token,userValid])

  return (
    <>
      {children}
    </>
  );
}

export default PrivateRoute;
