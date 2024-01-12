import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Product } from "./product";
import { useProductFetcher } from '../../Utils/ProductFetcher';
import './ProductList.css';

export const ProductsList = () => {
  useAuth(['customer']);
  const products = useProductFetcher();

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>JoJa Shop</h1>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
  
};
