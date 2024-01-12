import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const MyProducts = () => {

  useAuth(['seller']);

  return (
  <div> My Products</div>
  );
};
