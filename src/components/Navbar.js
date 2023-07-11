import React, { useContext, useState } from 'react'
import { AwesomeButton  } from "react-awesome-button";
import { codeSnippet } from './Code';

import { languages } from '../data/languages';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import Canva from './Canva';
import { LoginContext } from '../context/UserContext';
// import { ZapIcon } from "@primer/octicons-react";
export default function Navbar(props) {
    
    const [langid,setLangid]=useState(45);
    const [runloader,setRunloader]=useState(false);
    const {input,setInput,output,setOutput,codeSnippets}=useContext(LoginContext);
    
    const handleSelect=(e)=>{
        const selected=e.target.selectedIndex;
        const selectedOption = e.target.options[e.target.selectedIndex];
        setLangid(languages[selected].id);
    }
    const runCode=async()=>{
        setRunloader(true);
          axios({url:`https://judge0-ce.p.rapidapi.com/submissions`,method:"Post",
          params: {
            base64_encoded: 'true',
            wait: 'true',
            fields: '*'
          },
          headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          },
          data:{language_id:langid,source_code:btoa(codeSnippets),stdin:btoa(input)}}).then((res)=>{
            console.log(res.data);
            setOutput(res.data);
            setRunloader(false);
            console.log(output);
            if(res.data.status.description==="Compilation Error"){
                toast(`${res.data.status.description}`);
            }
            toast(`${res.data.status.description},it took ${res.data.time}s`);

            axios({url:`http://localhost:8000/users/submissions`,method:"Post",withCredentials:true,
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
              },
              data:{result:res.data}}
            ).then((response)=>{
               
            })
        });
          }
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid " style={{justifyContent:"flex-start",gap:"3rem"}}>
      <a class="navbar-brand" href="">CompilerANY</a>
      <select onChange={handleSelect}>
        {languages.map((option, index) => (
            <option key={index} value={option} >
                            {option.name}
                            </option>
                        ))}
</select>
      <div>
      <button type="button" class="btn btn-primary btn-sm" style={{width:"8rem"}} onClick={runCode}>
        {runloader ? <ClipLoader color='#36d7b7' size={15}/>: "Run"}
        </button>
      </div>
      <div>
        <Canva submission={props.submission}/>
      </div>
    </div>
  </nav>
  )
}
