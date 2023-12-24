import axios from 'axios';
function decodeJwt(jwtToken) {
    const base64Url = jwtToken.split('.')[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace Base64 URL encoding characters
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); // Decode Base64 and handle URI component encoding
  
    return JSON.parse(jsonPayload);
  }
  

//REDUX
async function handleFormSubmitAndSwitch(formName, email, pass, name, role) {

    // Handle login form submission
    if (formName === 'login') {
      const loginData = {
        grant_type: 'password',
        username: email,
        password: pass,
        client_id: 'frontend-app',
        client_secret: 'Lag8j582cKmPJeG8oSJdlsz0d1WKOZu2',
      };
  
      try {
        const response = await axios.post(
          `http://localhost:8890/auth/realms/E-Shop/protocol/openid-connect/token`,
          new URLSearchParams(loginData).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
  
        if (response.status === 200) {
          const { access_token } = response.data;
  
          // Store in local storage username, email, role (customer, seller), and refresh_token
          const decodeToken = await decodeJwt(access_token);
      
        } else {
          console.error('Login failed:', response.data);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  
    // Handle registration form submission
    else if (formName === 'register') {
      // Create a registration request object
      const registerData = {
        email: email,
        enabled: 1,
        username: name,
        attributes: {
          client_id: 'frontend-app',
        },
        groups: [role],
        credentials: [
          {
            type: 'password',
            value: pass,
            temporary: false,
          },
        ],
      };
      try {
        // Get admin access token
        const adminTokenResponse = await axios.post(
          `http://localhost:8890/auth/realms/master/protocol/openid-connect/token`,
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'admin-cli',
            client_secret: 'zh9C9EEEBUj8V4VchUkAdaHmw0SAL4F4',
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
  
        if (adminTokenResponse.status === 200) {
          const adminAccessToken = adminTokenResponse.data.access_token;
  
          // Make registration request
          const registerResponse = await axios.post(
            `http://localhost:8890/auth/admin/realms/E-Shop/users`,
            registerData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminAccessToken}`,
              },
            }
          );
  
          if (registerResponse.status === 201) {
            // Registration successful
            alert('User registration is successful');
            
          } else {
            console.error('User registration failed:', registerResponse.data);
          }
        } else {
          console.error('Failed to obtain admin access token:', adminTokenResponse.data);
        }
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    }
  }
  
  export {handleFormSubmitAndSwitch};
  