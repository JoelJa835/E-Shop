// DeleteProduct.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../ProductsGlobal.css';

export const DeleteProduct = () => {

  useAuth(['seller']);

  return (
    <div>
      <h2>Διαγραφή Προϊόντος</h2>
    </div>
  );
};

