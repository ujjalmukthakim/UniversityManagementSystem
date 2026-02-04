import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import api from './api/api'


import './App.css'


function App() {
const [students, setStudent] = useState([]);

const getStudentInfo=async()=>{
  try{

    await api.get().then((res)=>setStudent(res.data))
  }catch(error){
    console.log(error)
  }

}
useEffect(()=>{
  getStudentInfo()
},[]);

const {register,handleSubmit,formState:{errors},reset}=useForm();

const formSubmit=async(data)=>{
  await api.post('',data)
  reset()
  getStudentInfo()

  

}

const hanldeDelete=async(id)=>{
  await api.delete(`/${id}/`);
  getStudentInfo()


}

  return (


    <div>
      {/* this is input section  */}
      <form onSubmit={handleSubmit(formSubmit)}>
        <input placeholder='Name' {...register('name')}/>
        <input placeholder='Department' {...register('department')}/>
        <button type='submit'> Add</button>
      </form>




    {/* this is information section */}
    <div>
      {students.map((student)=>(
        <div>

          <p key={student.id}>{student.name}
             
          </p>
          <p key={student.id}>{student.department}</p>
             <button>EDIT</button>
             <button onClick={()=>hanldeDelete(student.id)}>Delete</button>

        </div>
      
      ))}
    </div>
    </div>
 
  )
}

export default App
