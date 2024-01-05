import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { handleLogout } from '../Utils';
import '../ProductsGlobal.css';

export const MyProducts = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const location = useLocation();
  //const [myProducts, setMyProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    location.state?.username || ''
  );

  const [refresh_token, setRefreshToken] = useState(location.state?.refresh_token || '');
  //const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
 

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
