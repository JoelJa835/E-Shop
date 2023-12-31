// Orders.js
import React from 'react';

export const Orders = () => {
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
    </div>
  );
};

