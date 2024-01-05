// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = (allowedRoles) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assume you have a way to retrieve user roles, adjust as needed
    const userRoles = localStorage.getItem('role'); // Replace with actual user roles retrieval function
    

    const hasAccess = allowedRoles.includes(userRoles);

    if (!hasAccess) {
      // Clear all items in localStorage
      localStorage.clear();
      navigate('/');
    }
  }, [allowedRoles, navigate]);

  return null; // This hook doesn't render anything
};
