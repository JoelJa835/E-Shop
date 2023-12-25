import { useState } from 'react';
import { Menu } from './Menu';

export const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="products-list">
      <h1>Products</h1>
    </div>
  );
};
