import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { errorSelector, login, messageSelector, setInitialState, successSelector } from '../../Redux/authenticationSlice';
import style from './login.module.css';
const Login = () => {
  const error = useSelector(errorSelector)
  const message = useSelector(messageSelector)
  const success = useSelector(successSelector)
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const handleChange = (e)=>{
      setFormData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }
  const handleSubmit = (e)=>{
    console.log(formData)
    e.preventDefault()
    dispatch(login(formData))
  }
 
  const handleActionComplete = ()=>{
    dispatch(setInitialState())
  }
  if(error===true){
    Swal.fire({
      title: message,
      text: '',
      icon: 'warning',
    })
    handleActionComplete()
   }
  useEffect(()=>{
    if(success){
      navigate('/')
      handleActionComplete()
    }

  },[success])

  return (
    <div className={style.loginPage} >
          <div className={style.container}>
          <section className="vh-95" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" name='email' onChange={handleChange}  />
                      <label className="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control"  name='password' onChange={handleChange}/>
                      <label className="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <Link  className="btn btn-primary btn-lg" to='/sign' >Don't have an account ...</Link>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          </div>
    </div>
  );
}

export default Login;
