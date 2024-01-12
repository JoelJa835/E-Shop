// Products.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Products = () => {

  console.log("Products component rendered");
  
  useAuth(['customer']);

  return (
    <div>Products</div>
  );
};
