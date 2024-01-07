// UpdateProduct.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../ProductsGlobal.css';

export const UpdateProduct = () => {

  useAuth(['seller']);

  return (
    <div>
      <h2>Ανανέωση Προϊόντος</h2>
    </div>
  );
};


