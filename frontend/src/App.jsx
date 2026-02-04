import { useEffect, useState } from 'react'
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


  return (

    <div>
      {students.map((student)=>(
        <p key={student.id}>{student.name}</p>
      ))}
    </div>
 
  )
}

export default App
