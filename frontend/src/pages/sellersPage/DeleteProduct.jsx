// DeleteProduct.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

export const DeleteProduct = () => {

  useAuth(['seller']);

  const [productId, setProductId] = useState('');

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5002/product/id/${productId}`);

      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div>
      <h2>Delete Product Page</h2>
      <p>Enter the Product ID you want to delete:</p>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <button type="button" onClick={handleDeleteProduct}>
        Delete Product
      </button>
    </div>
  );
};

