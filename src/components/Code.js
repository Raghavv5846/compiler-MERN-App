import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/UserContext';

export default function Code(props) {
    // This code snippet highlights the currently active line
    const [code, setCode] = useState('');
    const DEFAULT_LINES = 10;
    const lines = code.split('\n');
    const totalLines = Math.max(DEFAULT_LINES,lines.length);
    const {codeSnippets,setCodeSnippets}=useContext(LoginContext);
    useEffect(() => {
        if (props.source) {
          setCode(atob(props.source));
        }
      }, [props.source]);
    
      const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        setCodeSnippets(newCode);
      };
      console.log(codeSnippets);
  return (
    <>
        <div className="code-editor">
      <div className="line-numbers" >
        {Array.from({ length: totalLines }).map((_, index) => (
          <span key={index + 1} className="line-number">
            {index + 1}
          </span>
        ))}
      </div>
      <textarea 
      className="code-input"
      value={code}
      onChange={handleCodeChange}
      spellCheck={false}
      rows={totalLines}
      />
      
    </div>
    
    </>
  )
}
