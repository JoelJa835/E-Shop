
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../ProductsGlobal.css';


export const Cart = () => {
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
    </div>
  );
};

