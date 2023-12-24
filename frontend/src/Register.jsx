import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = (props) => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with user registration data
    const userData = {
      username: username,
      email: email,
      role: role,
      password: password,
    };

    // Send a POST request to your backend
    try {
      // Send a POST request to your backend using axios
      const response = await axios.post('http://localhost:5000/register', userData);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Registration successful
        const responseData = await response.json();
        console.log(responseData.message);
        console.log('User registered successfully');
        navigate('/login'); // Redirect to login page or handle as needed
      } else {
        // Registration failed
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error during registration:', error);
    }
  };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form"onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Johny Sins" id="username" name="username"/>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="role">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role"><option value="">Select Role</option><option value="Sellers">Sellers</option><option value="Customers">Customers</option></select>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password"/> 
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}