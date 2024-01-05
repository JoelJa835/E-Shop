// Products.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import '../ProductsGlobal.css';


export const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [loggedInUser, setLoggedInUser] = useState(location.state?.username || '');
   const [refresh_token, setRefreshToken] = useState(location.state?.refresh_token || '');

   const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  return (
    <div className="my-products-list">
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>
        <div className="menu-container">
          <div className="hover-menu">
            <div className="user-details">
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
