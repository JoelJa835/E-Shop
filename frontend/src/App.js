import React, { useState, useEffect } from "react";
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { MyProducts } from './components/MyProducts'; 
import { Products }from './components/Products'; 
import { ProductsList }from './components/ProductsList'; 
import { Orders }from './components/Orders'; 
import { Cart }from './components/Cart'; 
import { AddProduct }from './components/AddProduct'; 
import { UpdateProduct }from './components/UpdateProduct'; 
import { DeleteProduct }from './components/DeleteProduct'; 






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

     // Check if the user role is null (not yet set)
    if (userRole === null) {
      console.log('User role is not yet set. Waiting...');
      return null; // or loading indicator, redirect to login, etc.
    }
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
            path="/products/list"
            element={<PrivateRoute element={<ProductsList />} roles={['customer']} />}
          />
          <Route
            path="/products/orders"
            element={<PrivateRoute element={<Orders />} roles={['customer']} />}
          />
          <Route
            path="/products/cart"
            element={<PrivateRoute element={<Cart />} roles={['customer']} />}
          />
          <Route
            path="/myproducts/addproduct"
            element={<PrivateRoute element={<AddProduct />} roles={['seller']} />}
          />
          <Route
            path="/myproducts/updateproduct"
            element={<PrivateRoute element={<UpdateProduct />} roles={['seller']} />}
          />
          <Route
            path="/myproducts/delproduct"
            element={<PrivateRoute element={<DeleteProduct />} roles={['seller']} />}
          />
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
