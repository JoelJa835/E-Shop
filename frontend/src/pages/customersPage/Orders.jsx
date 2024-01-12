import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem('userName');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/orders/username/${username}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [username]);
  useAuth(['customer']);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found for {username}.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order ID: {order._id}</h3>
              {order.Products.map((product, index) => (
                <div key={index} className="product-item">
                  <img src={product.productImage} alt={`Product: ${product.productName}`} />
                  <p>Product: {product.productName}</p>
                  <p>Quantity: {product.amount}</p>
                  <p>Price: {product.price} €</p>
                  <p>Total: {product.amount * product.price} €</p>
                </div>
              ))}
              <p>Total Order Price: {order.Total_price} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

