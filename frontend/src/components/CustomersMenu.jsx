import React from 'react';

export const CustomersMenu = ({ loggedInUser, handleLogout }) => {
  return (
    <div className="menu-container">
      <div className="hover-menu">
        <div className="user-details">
          <h3>{loggedInUser}</h3>
        </div>
        <div className="actions">
          <a href="/products/list" className="product-link">
            Products
          </a>
          <a href="/products/orders" className="product-link">
            Orders
          </a>
          <a href="/products/cart" className="product-link">
            Cart
          </a>
          <button className="product-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

