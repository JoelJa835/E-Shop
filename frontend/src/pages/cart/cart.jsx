import React, { useState, useEffect,useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-items";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import "./cart.css";


export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  useAuth(['customer']);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
          return null;
        })}
        <p style={{ fontSize: "24px" }}> Subtotal: ${totalAmount} </p>
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <button onClick={() => navigate("/products/list")}> Continue Shopping </button>
          <button
            onClick={async () => {
              try {
                await checkout();
                // If checkout is successful, navigate to the orders page
                navigate("/products/orders");
              } catch (error) {
                // Handle the error, e.g., show an error message to the user
                console.error("Checkout failed:", error);
              }
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
