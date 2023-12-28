import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import GoogleSignInComponent from '../../Components/GoogleButton/GoogleButton';
import { errorSelector, messageSelector, setInitialState, signGoogle, signUp, successSelector } from '../../Redux/authenticationSlice';
import { storage } from '../../firebase';
import { useGoogle } from '../../hooks/useGoogle';
import style from './sign.module.css';
const defaultValue={
  email:'',
  password:'',
  name:''
}
const Sign = () => {
  const error = useSelector(errorSelector)
  const message = useSelector(messageSelector)
  const success = useSelector(successSelector)
  const [id,setId] = useState('')
  const [formData,setFormData]=useState(defaultValue)
  const [loading,setLoading]=useState(false)
  const [fileUpload,setFileUpload] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(id)
  const handleClick = ()=>{
    const result = useGoogle()
    dispatch(signGoogle())
  }
  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUpload) return;
    try {
      const imageListRef = ref(storage, `${id}/`);
      const fileFolderRef = ref(storage, `${id}/${fileUpload.name}`);
      setLoading(true)
      // Upload file
      await uploadBytes(fileFolderRef, fileUpload);
      // List items in the folder
      const result = await listAll(imageListRef);
      const downloadURLs = [];
      // Get download URLs for each item
      for (const item of result.items) {
        const url = await getDownloadURL(item);
        downloadURLs.push(url);
      }
      console.log(downloadURLs);
      const obj = { ...formData, photoUrl: downloadURLs[0] };
      dispatch(signUp(obj));
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle the error: show a message to the user, log it, etc.
    }
  };
  const handleFileChange = (e)=>{
    console.log(id)
    console.log(e.target.files[0])
    setFileUpload(e.target.files[0])
  }
  
  useEffect(()=>{
    if(error){
      Swal.fire({
        title:message,
        icon:'warning'
      })
    }
    if(success){
      navigate('/')
    }
    dispatch(setInitialState())
    setLoading(false)
  },[error,success])
  useEffect(()=>{
    setId(uuid())
  },[])
  if(loading){
    return (
      <div className={style.loading}>
      <Spinner animation="border"/>
      </div>
    )
  }else{
  return (
    <div classNameName={style.signPage} >
          <div classNameName={style.container} >
          <section className="vh-95" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name='name' onChange={handleChange} />
                      <label className="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control"  name='email' onChange={handleChange}/>
                      <label className="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="file" id="form3Example3c" className="form-control" onChange={handleFileChange} />
                      <label className="form-label" for="form3Example3c">Your Icon</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" onChange={handleChange} name='password'/>
                      <label className="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>
                  <div className="d-grid gap-2 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" >Register</button>
                  </div>
                  <GoogleSignInComponent/>
                  
                  <div className="d-grid gap-2 mb-3 mb-lg-4">
                    <Link  className="btn btn-primary btn-lg" to='/login' >Already register...</Link>
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
}
export default Sign;
