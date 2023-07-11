import React, { useContext, useEffect, useState } from 'react'

import { LoginContext } from '../context/UserContext';

export default function Output(props) {
    const [code, setCode] = useState('');
    const DEFAULT_LINES = 10;
    const lines = code.split('\n');
    const totalLines = Math.max(DEFAULT_LINES,lines.length);
    const {codeSnippets,setCodeSnippets,output,setOutput}=useContext(LoginContext);
    // console.log(codeSnippets);
    useEffect(()=>{
        if(props.source){
            setCode(atob(props.source));
        }
        if(output){
            // console.log("output",atob(output.source_code));
            setCode(atob(output.stdout));
        }
    },[output]);
    
  return (
    <div className="code-editor">
    <div className="line-numbers" >
      {Array.from({ length: totalLines }).map((_, index) => (
        <span key={index + 1} className="line-number">
          {index + 1}
        </span>
      ))}
    </div>
    {props.source ? 
      <textarea 
      className="code-input"
      value={atob(props.source)}
     
      spellCheck={false}
      rows={totalLines}
      />
      : 
      <textarea 
      className="code-input"
      value={code}
     
      spellCheck={false}
      rows={totalLines}
      />
      }
  </div>
  )
}
