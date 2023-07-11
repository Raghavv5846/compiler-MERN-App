import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<Main options={options}/>} />
        
      </Routes>
        <ToastContainer/>
    </Router>
  );
}

export default App;
