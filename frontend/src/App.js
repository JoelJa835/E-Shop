import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MyProducts } from './MyProducts'; 
import { Products } from './Products'; 







function App() {
  //const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const [currentForm, setCurrentForm] = useState('login');
  const [userRole, setUserRole] = useState(null); // Initialize as null or a default role

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/home" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} setUserRole={setUserRole} /> : <Register onFormSwitch={toggleForm} />} />
      </Routes>
    </Router>
  </div>
);
}

export default App;
