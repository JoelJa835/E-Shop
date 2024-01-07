// ProductsList.js
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import '../../ProductList.css';

export const ProductsList = () => {

  useAuth(['customer']);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>JoJa Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
  
};
