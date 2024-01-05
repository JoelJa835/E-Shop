import React, { useState } from "react";
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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



  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
            <Route
              path="/myproducts" element={<MyProducts />}  
            />
            <Route
              path="/products" element={<Products />}  
            />
            <Route
              path="/products/list" element={<ProductsList />}  
            />
            <Route
              path="/products/orders" element={<Orders />}  
            />
            <Route
              path="/products/cart" element={<Cart />}  
            />
            <Route
              path="/myproducts/addproduct" element={<AddProduct />}  
            />
            <Route
              path="/myproducts/updateproduct" element={<UpdateProduct />}  
            />
            <Route
              path="/myproducts/delproduct" element={<DeleteProduct />}  
            />

      </Routes>
    </Router>
  </div>
);
}

export default App;
