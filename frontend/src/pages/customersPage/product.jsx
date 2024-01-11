import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
  



export const Product = (props) => {
  const { id, productName, productImage, price, Quantity} = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  console.log(productImage);

  return (
    <div className="product">
      <img src={productImage} alt={`Product: ${productName}`}/>
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};