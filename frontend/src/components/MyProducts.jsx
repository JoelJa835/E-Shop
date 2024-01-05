import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { handleLogout } from '../Utils';
import { useAuth } from '../hooks/useAuth';
import '../ProductsGlobal.css';

export const MyProducts = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  
  const username = localStorage.getItem('userName');
  const refresh_token = localStorage.getItem('refreshToken');
 

  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  useAuth(['seller']);

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
                <Link to="/myproducts/addproduct" className="product-link">
                  Add Product
                </Link>
                <Link to="/myproducts/updateproduct" className="product-link">
                  Update Product
                </Link>
                <Link to="/myproducts/delproduct" className="product-link">
                   Delete Product
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
