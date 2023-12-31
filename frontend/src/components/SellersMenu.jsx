import React from 'react';

export const SellersMenu = ({ loggedInUser, handleLogout }) => {
  return (
    <div className="menu-container">
      <div className="hover-menu">
        <div className="user-details">
          <h3>{loggedInUser}</h3>
        </div>
        <div className="actions">
        <a href="/myproducts/addproduct" className="product-link" >
          Add Product
        </a>
        <a href="myproducts/updateproduct" className="product-link" >
          Update Product
        </a>
        <a href="/myproducts/delproduct" className="product-link" >
          Delete Product
        </a>
        <button className="product-btn" onClick={handleLogout}>Logout</button>
      </div>
      </div>
    </div>
  );
};