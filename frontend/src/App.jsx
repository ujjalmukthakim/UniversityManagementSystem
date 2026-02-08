import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import api from './api/api'


import './App.css'


function App() {
const [students, setStudent] = useState([]);
const[edit,setEdit]=useState(null)

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
  try{
    if(edit){
      await api.patch(`/${edit.id}/`,data)
      setEdit(null)
    }
    else{
        await api.post('',data)

    }
      reset({
    name:'',
    department:''
  });
  getStudentInfo();
  }
  catch(error){
    console.log(error)
  }



  

}

const hanldeDelete=async(id)=>{
  await api.delete(`/${id}/`);
  getStudentInfo()


}

const handleEdit=(student)=>{
  setEdit(student)
  reset({
    name:student.name, 
    department:student.department
  })


}

  return (


    <div>
      <div>
        {/* header Section */}
        <div>
          <h1 className='text-gray-800 font-extrabold text-3xl tracking-tight'>Student Management</h1>
          <p className='mt-2 text-gray-900'>Managing Department Records</p>

        </div>

      {/* this is input section  */}
      <form onSubmit={handleSubmit(formSubmit)}>
        <input placeholder='Name' {...register('name')}
        className='border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
        />
        <input placeholder='Department' {...register('department')}
        className='border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
        />
        <button type='submit'
        className={`text-white px-6 py-2.5 rounded-lg font-medium transition-colors ${edit?'bg-amber-500 hover:bg-amber-700':'bg-blue-500 hover:bg-blue-700'}`}
        > {edit?'Update':'Add Student'}</button>
      </form>
      </div>




    {/* this is information section */}
    <div>
      {students.map((student)=>(
        <div>

          <p key={student.id}>{student.name}
             
          </p>
          <p key={student.id}>{student.department}</p>
             <button onClick={()=>handleEdit(student)}
              className='bg-blue-50 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-100 transition-colors'
              >EDIT</button>
             <button onClick={()=>hanldeDelete(student.id)}
              className='bg-red-50 text-red-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-red-100 transition-colors'
              >Delete</button>

        </div>
      
      ))}
    </div>
    </div>
 
  )
}

export default App
