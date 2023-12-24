import { useState } from 'react';

export const Menu = () => {
  const [role, setRole] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <nav className="menu">
      {role === 'customer' ? (
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a href="/orders">Orders</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      ) : (
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a href="/my-products">My Products</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      )}
    </nav>
  );
};
