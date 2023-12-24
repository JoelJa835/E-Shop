import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';






function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/home" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
        {/* <Route path="/login" element={<Login onFormSwitch={toggleForm} />} /> */}
      </Routes>
    </Router>
  </div>
);
}

export default App;
