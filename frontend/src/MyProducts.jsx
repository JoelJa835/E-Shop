import { useState } from 'react';
import { Menu } from './Menu';

export const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);

  return (
    <div className="my-products-list">
      <h1>My Products</h1>
      <Menu />
    </div>
  );
};
