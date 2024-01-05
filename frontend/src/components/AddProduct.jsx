// AddProduct.jsx
import React from 'react';
import Logo from '../images/logo1.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import { useAuth } from '../hooks/useAuth';
import '../ProductsGlobal.css';

export const AddProduct = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
  const refresh_token = localStorage.getItem('refreshToken');

  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  useAuth(['seller']);

  return (
    <div>
      <h2>Προσθήκη Προϊόντος</h2>
      {/* Add your form or content for adding a product */}
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
    </div>
  );
};

