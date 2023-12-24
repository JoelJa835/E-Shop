import { useState } from "react"
import axios from 'axios';




export const Login = (props) => {
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
          const { userId, email, role, access_token } = response.data;
  
          // Store the user information in your state or Redux store
          // For example, you can dispatch an action if using Redux
          // dispatch(setUser({ userId, email, role, access_token }));
  
          // Redirect to a different page or perform any other actions
          // ...
  
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