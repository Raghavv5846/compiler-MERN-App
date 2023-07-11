import React, { useContext, useEffect, useState } from 'react'
import Code from '../components/Code'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../components/Input';
import Output from '../components/Output';
import { LoginContext } from '../context/UserContext';

export default function Main() {
    const [loggedin,setLoggedin]=useState(false);
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [languages,setLanguages]=useState(null);
  const navigate=useNavigate();
  const [show,setShow]=useState(null);
  const [submission,setSubmission]=useState(null);
  const location=useLocation();
  const {output}=useContext(LoginContext);
  useEffect(()=>{
    if(output){
        setShow("active");
    }
  },[output]);
  useEffect(()=>{
    axios({url: `http://localhost:8000/users/getSubmissions`,
            withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
        
            setSubmission(res.data.submiss);
        })
        // Catch errors if any
        .catch((err) => { });
  },[])

      useEffect(()=>{
        axios({url: `http://localhost:8000/protected`,
            withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
           
            if(res.data.status==='success'){
              setUser(res.data.user);
              console.log(user);
            }
            else if(res.data.status==='failed'){
                navigate(res.data.url);
            }
        })
        // Catch errors if any
        .catch((err) => {
            navigate('/login');
         });
},[loggedin])

  return (
    <>
    <Navbar submission={submission} />
    <div >
        <div className='text-white'style={{backgroundColor:"black"}} >
        <div style={{marginLeft:"1rem"}}><button>Main.cpp</button></div>
        </div>
        <div>
            {location.state ? <Code source={location.state.var.result[0].source_code}/> : <Code/>}

        </div>
    </div>
    <div >
        <div className='text-white' style={{display:"flex",backgroundColor:"black"}}>
            <div style={{marginLeft:"2rem"}}><button onClick={()=>setShow(null)} style={show ? {backgroundColor:"white"} : {backgroundColor:"red"} }>Input</button></div>
            <div><button onClick={()=>setShow('active')} style={show ? {backgroundColor:"red"} : {backgroundColor:"white"} }>Output</button></div>
        </div>
        <div>
            {location.state ? 
            show ? <Output source={location.state.var.result[0].stdout}/> : <Input source={location.state.var.result[0].stdin}/>
            :
            show ? <Output/> : <Input/>
        }
        </div>
    </div>

    </>
  )
}
