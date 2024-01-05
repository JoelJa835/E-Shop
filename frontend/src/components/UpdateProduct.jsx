// UpdateProduct.jsx
import React, { useState } from 'react';
import Logo from '../images/logo1.jpg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import '../ProductsGlobal.css';

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [refresh_token, setRefreshToken] = useState(location.state?.refresh_token || '');

  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  return (
    <div>
      <h2>Ανανέωση Προϊόντος</h2>
      {/* Add your form or content for updating a product */}
      <div className="my-products-list">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
          <div className="menu-container">
              <div className="hover-menu">
                <div className="user-details">
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


