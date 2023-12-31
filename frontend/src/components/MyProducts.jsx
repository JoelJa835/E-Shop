import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import axios from 'axios';
import '../ProductsGlobal.css';
import { SellersMenu } from './SellersMenu';

export const MyProducts = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const location = useLocation();
  //const [myProducts, setMyProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    location.state?.username || ''
  );

  const [refresh_token, setRefreshToken] = useState(location.state?.refresh_token || '');
  //const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
 

  const handleLogout = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Prepare data for login request
    const logoutData = {
        refresh_token: refresh_token,
    };

    try {
    // Make a POST request to the /login endpoint on your backend
    const response = await axios.post('http://localhost:5000/logout', logoutData);
    console.log(response.status);

    if (response.status >= 200 && response.status < 300) {
      navigate('/');

    } else {
      // Handle login failure
      console.error('Logout failed:', response.data);
    }
    } catch (error) {
    // Handle network error or other issues
    console.error('Error during logout:', error);
    }
  };

  

  return (
  <div className="my-products-list">
  <div className="logo-container">
    <img src={Logo} alt="Logo" />
  </div>
  <SellersMenu loggedInUser={loggedInUser} handleLogout={handleLogout} />
      {/* Other content specific to Products.js */}
</div>

  );
};
