// Orders.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo1.jpg';
import { Link } from 'react-router-dom';
import { handleLogout } from '../Utils';
import '../ProductsGlobal.css';


export const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [refresh_token, setRefreshToken] = useState(location.state?.refresh_token || '');
  // Sample orders data (you can replace this with your actual data)
  const orders = [
    {
      orderId: 1,
      product: "Product 1",
      quantity: 2,
      total: 21.98,
    },
    {
      orderId: 2,
      product: "Product 2",
      quantity: 1,
      total: 19.99,
    },
    // Add more orders as needed
  ];

  const handleLogoutClick = () => {
    handleLogout(refresh_token, navigate);
  };

  return (
    <div>
      <h1>Orders</h1>
      {/* Orders Rendering */}
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-item">
            <h3>Order ID: {order.orderId}</h3>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: {order.total} €</p>
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

