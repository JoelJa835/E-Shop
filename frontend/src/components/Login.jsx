import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';




export const Login = (props) => {
    const navigate = useNavigate(); // Use useNavigate hook to get the navigation function
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        // Prevent default form submission
        e.preventDefault();
        // Prepare data for login request
        const loginData = {
            username: username,
            password: password,
        };
  
        try {
        // Make a POST request to the /login endpoint on your backend
        const response = await axios.post('http://localhost:5000/login', loginData);
  
        if (response.status === 200) {
          // Successful login, handle the response data as needed
          const { role, access_token, refresh_token } = response.data;
          console.log(refresh_token);
          //localStorage.setItem('username', username);
          localStorage.setItem('role', role);
          
          // Save the tokens to localStorage
          //localStorage.setItem('refreshToken', refresh_token);
          // localStorage.setItem('accessToken', access_token);
          // Redirect based on the user's role
          if (role === 'seller') {
            // Redirect to the seller's page (change the route as needed)
            navigate('/myproducts', { state: { username, refresh_token } });
          } else if (role === 'customer') {
            // Redirect to the customer's page (change the route as needed)
            navigate('/products', { state: { username, refresh_token } });
          } else {
            // Handle unknown role or other cases
            console.error('Unknown role:', role);
          }
  
        } else {
          // Handle login failure
          console.error('Login failed:', response.data);
        }
        } catch (error) {
        // Handle network error or other issues
        console.error('Error during login:', error);
        }
      };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password"/> 
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )

}