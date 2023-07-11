import React from 'react'
import '../styles/google.css'
export default function Login() {
    const handleLogin=()=>{
        window.location.href="http://localhost:8000/users/auth/google";
    }
  return (
    <div class="google-btn" style={{position:"absolute",top:"50%",left:"50%",transform:'translate(-50%,-50%',cursor:"pointer"}}>
      <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p class="btn-text" onClick={handleLogin}><b>Sign in with google</b></p>
    </div>
  )
}
