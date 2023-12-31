// Menu.js
import React from 'react';

export const Menu = ({ username, onLogout }) => {
  return (
    <div className="menu-container">
      <div className="user-welcome">
        Welcome, {username} 
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
