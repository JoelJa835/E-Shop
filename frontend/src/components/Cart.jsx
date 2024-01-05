// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import { useAuth } from '../hooks/useAuth';
import '../ProductsGlobal.css';


export const Cart = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
  const refresh_token = localStorage.getItem('refreshToken');
  // Sample cart data (you can replace this with your actual data)
  const cartItems = [
    {
      productId: 1,
      productName: "Product 1",
      quantity: 3,
      price: 10.99,
      total: 32.97,
    },
    {
      productId: 2,
      productName: "Product 2",
      quantity: 1,
      price: 19.99,
      total: 19.99,
    },
    // Add more cart items as needed
  ];
  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  useAuth(['customer']);

  return (
    <div>
      <h1>Cart</h1>
      {/* Cart Items Rendering */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <h3>{item.productName}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price} €</p>
            <p>Total: {item.total} €</p>
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
    </div>
  );
};

