// AddProduct.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import '../../ProductsGlobal.css';

export const AddProduct = () => {

  useAuth(['seller']);


  const [product, setProduct] = useState({
    id: '',
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

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5002/products', product);

      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <label>ID:</label>
        <input type="text" name="id" value={product.id} onChange={handleInputChange} />

        <label>Product Name:</label>
        <input type="text" name="productName" value={product.productName} onChange={handleInputChange} />

        <label>Product Image URL:</label>
        <input type="text" name="productImage" value={product.productImage} onChange={handleInputChange} />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleInputChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} />

        <label>Customer Name:</label>
        <input type="text" name="customerName" value={product.customerName} onChange={handleInputChange} />

        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

