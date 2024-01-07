// AddProduct.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../ProductsGlobal.css';

export const AddProduct = () => {

  useAuth(['seller']);

  return (
    <div>
      <h2>Προσθήκη Προϊόντος</h2>
      {/* Add your form or content for adding a product */}
    </div>
  );
};

