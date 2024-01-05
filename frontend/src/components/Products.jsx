// Products.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import { useAuth } from '../hooks/useAuth';
import '../ProductsGlobal.css';


export const Products = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem('userName');
  const refresh_token = localStorage.getItem('refreshToken');


   const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  useAuth(['customer']);

  return (
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
                <Link to="/products/list" className="product-link">
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
  );
};
