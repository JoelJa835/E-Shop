// ProductsList.js
import React from 'react';

export const ProductsList = () => {
  // Sample product list data (you can replace this with your actual data)
  const productsList = [
    {
      name: "Product 1",
      image: "url_product_1.jpg",
      price: 10.99,
    },
    {
      name: "Product 2",
      image: "url_product_2.jpg",
      price: 19.99,
    },
    // Add more products as needed
  ];

  return (
    <div>
      <h1>Product List</h1>
      {/* Product List Rendering */}
      <div className="product-list">
        {productsList.map((product, index) => (
          <div key={index} className="product-card">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

