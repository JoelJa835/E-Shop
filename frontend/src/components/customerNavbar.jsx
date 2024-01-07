import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { handleLogout } from '../Utils';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import "./navbar.css";

export const CustomerNavbar = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem('userName');
    const refresh_token = localStorage.getItem('refreshToken');

    const handleLogoutClick = () => {
        handleLogout(refresh_token, navigate);
      };

  return (
    <div className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="user-details">
              <h3>{username}</h3>
        </div>
        <div className="links">
            <Link to="/products/list"> Products </Link>
            <Link to="/products/orders"> Orders </Link>
            <Link to="/products/cart">
            <ShoppingCart size={32} />
            </Link>
        </div>
        <button className="product-btn" onClick={handleLogoutClick}>
            Logout
        </button>
    </div>
  );
};
