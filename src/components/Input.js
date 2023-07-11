import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/UserContext';
export default function Input(props) {

    const [code, setCode] = useState('');
    const DEFAULT_LINES = 10;
    const lines = code.split('\n');
    const totalLines = Math.max(DEFAULT_LINES,lines.length);
    const {input,setInput}=useContext(LoginContext);
    const handleCodeChange = (event) => {
      setCode(event.target.value);
      console.log(code);
    
    };
    useEffect(()=>{
           setInput(code);
    },[code]);
    
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
      defaultValue={atob(props.source)}
      onChange={handleCodeChange}
      spellCheck={false}
      rows={totalLines}
      />
      : 
      <textarea 
      className="code-input"
      value={code}
      onChange={handleCodeChange}
      spellCheck={false}
      rows={totalLines}
      />
      }
    </div>
  )
}
