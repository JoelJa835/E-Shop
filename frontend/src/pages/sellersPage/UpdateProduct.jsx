// UpdateProduct.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

export const UpdateProduct = () => {

  useAuth(['seller']);

  const [productId, setProductId] = useState('');
  
  const [product, setProduct] = useState({
    productName: '',
    productImage: '',
    price: 0,
    quantity: 0,
    customerName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:5002/id/${productId}`, product);

      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <p>Enter the Product ID you want to update:</p>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <form>
        <label>Title:</label>
        <input type="text" name="productName" value={product.productName} onChange={handleInputChange} />

        <label>Image URL:</label>
        <input type="text" name="productImage" value={product.productImage} onChange={handleInputChange} />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleInputChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} />

        <label>Customer Name:</label>
        <input type="text" name="customerName" value={product.customerName} onChange={handleInputChange} />

        <button type="button" onClick={handleUpdateProduct}>
          Update Product
        </button>
      </form>
    </div>
  );
};


