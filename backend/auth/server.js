const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Enable CORS for specific routes
app.use('/register', cors(corsOptions)); // Apply CORS for the /register route
app.use('/login', cors(corsOptions));    // Apply CORS for the /login route
app.use('/logout', cors(corsOptions));
// Registration endpoint
app.post('/register', handleUserRegistration);

// Login endpoint
app.post('/login', handleUserLogin);

//Logout endpoint
app.use('/logout', handleUserLogout)

async function handleUserRegistration(req, res) {
  const { username, email, role, password} = req.body;

  // Create a registration request object
  const registerData = {
    username: username,
    email: email,
    enabled: 1,
    attributes: {
      client_id: process.env.LOGIN_CLIENT,
    },
    groups: [role],
    credentials: [
      {
        type: 'password',
        value: password,
        temporary: false,
      },
    ],
  };
  try {
    // Get admin access token
    const adminAccessToken = await getAdminAccessToken();
    // Make registration request
    const registerResponse = await makeRegistrationRequest(registerData, adminAccessToken);
    if (registerResponse.status === 201) {
      // Registration successful
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      console.error('User registration failed:', registerResponse.data);
      res.status(500).json({ error: 'User registration failed' });
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAdminAccessToken() {
  const adminTokenResponse = await axios.post(
    'http://localhost:8890/auth/realms/master/protocol/openid-connect/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.REGISTER_CLIENT,
      client_secret: process.env.REGISTER_SECRET, // Replace with your actual admin client secret
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (adminTokenResponse.status === 200) {
    return adminTokenResponse.data.access_token;
  } else {
    throw new Error('Failed to obtain admin access token');
  }
}

async function makeRegistrationRequest(registerData, adminAccessToken) {
  try {
    const response = await axios.post(
      'http://localhost:8890/auth/admin/realms/E-Shop/users', // Replace with your actual realm name
      registerData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAccessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error during registration request:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function handleUserLogin(req, res) {
  const { username, password } = req.body;

  // Keycloak login request data
  const loginData = {
    grant_type: 'password',
    username: username,
    password: password,
    client_id: process.env.LOGIN_CLIENT,
    client_secret: process.env.LOGIN_SECRET, // Replace with your actual client secret
  };

  try {
    // Request access token from Keycloak
    const response = await axios.post(
      'http://localhost:8890/auth/realms/E-Shop/protocol/openid-connect/token',
      new URLSearchParams(loginData).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      const { access_token, refresh_token } = response.data;
      

      // Decode the access token to get user information
      const decodedToken = await decodeJwt(access_token);
      const roles = decodedToken.realm_access.roles;
      const username = decodedToken.preferred_username;
    

      // Identify the specific role that indicates whether the user is a seller or a customer
      const isSeller = roles.includes("seller");
      const isCustomer = roles.includes("customer");

      if (isSeller) {
        res.status(200).json({
          username: username,
          role: "seller",
          access_token: access_token,
          refresh_token: refresh_token,
        });
      } else if (isCustomer) {  
        res.status(200).json({
          username: username,
          role: "customer",
          access_token: access_token,
          refresh_token: refresh_token,
        });
      }
    } else {
      console.error('Login failed:', response.data);
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function decodeJwt(jwtToken) {
  const base64Url = jwtToken.split('.')[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace Base64 URL encoding characters
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')); // Decode Base64 and handle URI component encoding

  return JSON.parse(jsonPayload);
}

async function handleUserLogout(req, res) {
  const {refresh_token} = req.body;

  // Keycloak login request data
  const logoutData = {
    refresh_token: refresh_token,
    client_id: process.env.LOGIN_CLIENT,
    client_secret: process.env.LOGIN_SECRET, // Replace with your actual client secret
  };

  try {
    // Request access token from Keycloak
    const response = await axios.post(
      'http://localhost:8890/auth/realms/E-Shop/protocol/openid-connect/logout',
      new URLSearchParams(logoutData).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      // Registration successful
      res.status(201).json({ message: 'Logout successfull' });
    } else {
      console.error('Logout failed:', response.data);
      res.status(500).json({ error: 'Logout failed' });
    }

  }catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }



}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});