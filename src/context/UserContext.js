// UserContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

export default function UserProvider({ children }){

    const [codeSnippets, setCodeSnippets] = useState('');
    const [input,setInput]=useState(null);
    const [output,setOutput]=useState(null);
    return (
      <LoginContext.Provider value={{ codeSnippets, setCodeSnippets, input, setInput,output,setOutput}}>
        {children}
      </LoginContext.Provider>
    );
}
