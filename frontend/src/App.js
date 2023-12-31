import React, { useState, useEffect } from "react";
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { MyProducts } from './components/MyProducts'; 
import  Products from './components/Products'; 







function App() {
  //const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const [currentForm, setCurrentForm] = useState('login');
  const [userRole, setUserRole] = useState(null); // Initialize as null or a default role


  useEffect(() => {
    // Fetch user role from wherever it's stored (localStorage, API, etc.)
    const storedUserRole = localStorage.getItem('role');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  const PrivateRoute = ({ element, roles }) => {
    // Check if the user has the required role to access the route
    if (roles.includes(userRole)) {
      return element;
    } else {
      // Redirect to an unauthorized page or handle it as you see fit
      return <Navigate to="/" />;
    }
  };

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} setUserRole={setUserRole} /> : <Register onFormSwitch={toggleForm} />} />
        <Route
            path="/myproducts"
            element={<PrivateRoute element={<MyProducts />} roles={['seller']} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<Products />} roles={['customer']} />}
          />
      </Routes>
    </Router>
  </div>
);
}

export default App;
