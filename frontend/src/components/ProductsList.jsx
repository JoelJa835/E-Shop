// ProductsList.js
import React from 'react';
import Logo from '../images/logo1.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import { useAuth } from '../hooks/useAuth';
import '../ProductsGlobal.css';


export const ProductsList = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
  const refresh_token = localStorage.getItem('refreshToken');
  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };
  // Sample product list data (you can replace this with your actual data)
  const productsList = [
    {
      name: "Product 1",
      image: "url_product_1.jpg",
      price: 10.99,
    },
    {
      name: "Product 2",
      image: "url_product_2.jpg",
      price: 19.99,
    },
    // Add more products as needed
  ];

  useAuth(['customer']);

  return (
    <div>
      <h1>Product List</h1>
      {/* Product List Rendering */}
      <div className="product-list">
        {productsList.map((product, index) => (
          <div key={index} className="product-card">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price} €</p>
          </div>
        ))}
      </div>
      <div className="my-products-list">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
          <div className="menu-container">
            <div className="hover-menu">
              <div className="user-details">
                <h3>{username}</h3>
              </div>
                <div className="actions">
                  <Link to="/products/list/$" className="product-link">
                    Products
                  </Link>
                  <Link to="/products/orders" className="product-link">
                    Orders
                  </Link>
                  <Link to="/products/cart" className="product-link">
                    Cart
                  </Link>
                </div>
                <button className="product-btn" onClick={handleLogoutClick}>
                    Logout
                </button>
            </div>
        </div>
      </div>
    </div>
    
  );
};