import axios from 'axios';

export const handleLogout = async (refreshToken, navigate) => {
  const logoutData = {
    refresh_token: refreshToken,
  };

  try {
    const response = await axios.post('http://localhost:5000/logout', logoutData);

    if (response.status >= 200 && response.status < 300) {
      navigate('/');
    } else {
      console.error('Logout failed:', response.data);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};