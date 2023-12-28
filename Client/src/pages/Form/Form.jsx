import { Box, ChakraProvider } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { currentUserSelector } from '../../Redux/authenticationSlice';
import { addProject, errorSelector, messageSelector, setInitialState, successSelector } from '../../Redux/projectsSlice';
import { usersSelector } from '../../Redux/usersSlice';
import style from './form.module.css';

const Form = () => {
  const users = useSelector(usersSelector)
  const currentUser = useSelector(currentUserSelector)
  const error = useSelector(errorSelector)
  const success = useSelector(successSelector)
  const message = useSelector(messageSelector)
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
      title:'',
      dueDate:(new Date(Date.now())).getFullYear(),
      description:''
  })
  const dispatch =  useDispatch()
  const [pickerItems, setPickerItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  
  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };
  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
   
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(selectedItems)
    if(selectedItems.length==0){
      Swal.fire({
        title: 'Please assign to at least one person',
        text: '',
        icon: 'warning',
      })
      return
    }
    const newFormData = {...formData,selectedItems:selectedItems,assigner:currentUser.name,id:currentUser.id}
    console.log(newFormData)
    
    dispatch(addProject(newFormData))
  }
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: message,
        text: '',
        icon: 'warning',
      });
      
      setFormData({
        title: '',
        dueDate: new Date(Date.now()).getFullYear(),
        description: '',
      });
    }else if(success){
      Swal.fire({
        title: message,
        text: '',
        icon: 'success',
      });
      
      navigate('/')
      dispatch(setInitialState())
    }
    
  }, [error, message, dispatch,success]);
  useEffect(()=>{
  setPickerItems((prev)=>{
    return users.filter((obj)=>obj.id!==currentUser.id).map((obj)=>{
      return {value:obj.id,label:obj.name}
    })
   
  })
  },[users])
  return (
    <form className={style.form} onSubmit={handleSubmit}>

  <div data-mdb-input-init className="form-outline mb-4">
    <input type="text" id="form4Example1" className="form-control" name='title' onChange={handleChange} value={formData.title} required/>
    <label className="form-label" for="form4Example1">Project Title</label>
  </div>
  <div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker" inline="true">
  <input placeholder="Select date" type="date" id="example" className="form-control" name='dueDate' onChange={handleChange} value={formData.dueDate} required/>
  <label for="example">Due Date</label>
  <i className="fas fa-calendar input-prefix"></i>
</div>
  
  <div data-mdb-input-init className="form-outline mb-4">
  <ChakraProvider>
      <Box>
        <CUIAutoComplete
          label="Choose users to assign project"
          placeholder="Choose a user"
          key={pickerItems}
          items={pickerItems}
          tagStyleProps={{
            rounded: "full",
            fontSize: "1rem"
          }}
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
      </Box>
    </ChakraProvider>
   
  </div>
  
  
  <div data-mdb-input-init className="form-outline mb-4">
    <textarea className="form-control" id="form4Example3" rows="4" onChange={handleChange} required name='description' value={formData.description}></textarea>
    <label className="form-label" for="form4Example3">Description</label>
  </div>

  
 

  <div className="d-grid gap-2">
  <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-lg btn-block mb-4">Send</button>
  </div>
</form>
  )
}

export default Form
