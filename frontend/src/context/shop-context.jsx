import { createContext, useState } from "react";
import { useProductFetcher } from "../Utils/ProductFetcher"
import axios from "axios";

import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

// const getDefaultCart = (products) => {
//   let cart = {};
//   for (let i = 1; i < products.length + 1; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};


export const ShopContextProvider = (props) => {
  const products = useProductFetcher();
  //console.log(products);
  // const [cartItems, setCartItems] = useState(getDefaultCart(products));
  const [cartItems, setCartItems] = useState(getDefaultCart());

  console.log(cartItems);

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = products.find((product) => product.id === Number(item));
  //       totalAmount += cartItems[item] * itemInfo.price;
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = async () => {
    const username = localStorage.getItem('userName');
    console.log(username);

    try {
      // const formattedProducts = Object.keys(cartItems).map((productId) => {
      //   const productInfo = PRODUCTS.find((product) => product.id === Number(productId));
  
      //   return {
      //     id: productInfo.id,
      //     productName: productInfo.name,
      //     amount: cartItems[productId],
      //     price: productInfo.price,
      //     productImage: productInfo.image,
      //   };
      // });

      const customProducts = [
        {
          id: 1,
          productName: "Test Product 5",
          amount: 2,
          price: 15.99,
          productImage: "phone1.jpeg",
        },
        {
          id: 2,
          productName: "Test Product 6",
          amount: 1,
          price: 24.99,
          productImage: "phone2.jpeg",
        },
      ];
  
      const response = await axios.post("http://localhost:5001/orders", {
        Products: customProducts,
        Total_price: getTotalCartAmount,
        Status: "Pending",
        customer_username: username, 
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
    });
  
      if (response.status === 200) {
        console.log("Order placed successfully!");
        setCartItems(getDefaultCart()); // Reset the cart on successful checkout
      } else {
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
