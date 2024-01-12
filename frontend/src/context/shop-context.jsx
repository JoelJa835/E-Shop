import { createContext, useState, useEffect } from "react";
import { useProductFetcher } from "../Utils/ProductFetcher"
import axios from "axios";


export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0;
  }
  console.log(products);
  return cart;
};


const getTotalCartAmount = (cartItems, products) => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = products.find((product) => product.id === Number(item));
      if (itemInfo) {
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
  }
  return totalAmount;
};


export const ShopContextProvider = (props) => {
  const products = useProductFetcher();
  //const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartItems, setCartItems] = useState(getDefaultCart(products));

  useEffect(() => {
    console.log("Products:", products);
    setCartItems((prevCartItems) => getDefaultCart(products || prevCartItems));
  }, [products]);
  
  useEffect(() => {
    console.log("Cart Items:", cartItems);
    // Ensure products are available before calculating the total cart amount
    if (products) {
      const totalAmount = getTotalCartAmount(cartItems,products);
      console.log("Total Amount:", totalAmount);
    }
  }, [products, cartItems]);
  

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
        const formattedProducts = Object.keys(cartItems).map((productId) => {
        const productInfo = products.find((product) => product.id === Number(productId));
  
        return {
          id: productInfo.id,
          productName: productInfo.productName,
          amount: cartItems[productId],
          price: productInfo.price,
          productImage: productInfo.productImage,
        };
      });
      console.log(formattedProducts);
  
      const response = await axios.post("http://localhost:5001/orders", {
        Products: formattedProducts,
        Total_price: getTotalCartAmount(cartItems, products),
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
        setCartItems(getDefaultCart([])); 
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
