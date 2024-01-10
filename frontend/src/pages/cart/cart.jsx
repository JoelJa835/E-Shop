import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-items";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';


import "./cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  useAuth(['customer']);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
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
                navigate("/orders");
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