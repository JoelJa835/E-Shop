import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../ProductsGlobal.css';

export const MyProducts = () => {

  useAuth(['seller']);

  return (
  <div> My Products</div>
  );
};
