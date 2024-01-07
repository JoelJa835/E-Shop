import React, { useState } from "react";
import './App.css';
import { Login } from './pages/root/Login';
import { Register } from './pages/root/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyProducts } from './pages/sellersPage/MyProducts'; 
import { Products }from './pages/customersPage/Products'; 
import { ProductsList }from './pages/customersPage/ProductsList'; 
import { Orders }from './pages/customersPage/Orders'; 
import { Cart }from './pages/cart/cart'; 
import { AddProduct }from './pages/sellersPage/AddProduct'; 
import { UpdateProduct }from './pages/sellersPage/UpdateProduct'; 
import { DeleteProduct }from './pages/sellersPage/DeleteProduct'; 
import { SellerNavbar } from "./components/sellerNavbar";
import { CustomerNavbar } from "./components/customerNavbar";
import { ShopContextProvider } from "./context/shop-context";


function App() {
  //const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const [currentForm, setCurrentForm] = useState('login');



  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              currentForm === "login" ? (
                <Login onFormSwitch={toggleForm} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )
            }
          />
          <Route
            path="/myproducts/*"
            element={
              <><SellerNavbar /><Routes>
                <Route
                  index
                  element={<MyProducts />} />
                <Route
                  path="/addproduct"
                  element={<AddProduct />} />
                <Route
                  path="/updateproduct"
                  element={<UpdateProduct />} />
                <Route
                  path="/delproduct"
                  element={<DeleteProduct />} />
              </Routes></>
            }
          />
          <Route
            path="/products/*"
            element={
              <><CustomerNavbar /><Routes>
                <Route
                  index
                  element={<Products />} />
                <Route
                  path="/list"
                  element={<ProductsList />} />
                <Route
                  path="/orders"
                  element={<Orders />} />
                <Route
                  path="/cart"
                  element={<Cart />} />
              </Routes></>
            }
          />
        </Routes>
      </Router>
    </ShopContextProvider>
  </div>
);
}

export default App;
