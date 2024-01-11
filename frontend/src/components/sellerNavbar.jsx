import React from "react";
import { Link } from "react-router-dom";
import { handleLogout } from '../Utils/Utils';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import "./navbar.css";

export const SellerNavbar = () => {

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
        <Link to="/myproducts/addproduct"> Add Product </Link>
        <Link to="/myproducts/updateproduct"> Update Product </Link>
        <Link to="/myproducts/delproduct"> Delete Product </Link>
      </div>
      <button className="product-btn" onClick={handleLogoutClick}>
          Logout
      </button>
    </div>
  );
};
