import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import jwt_decode from "jwt-decode";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    const requestOptions= {
      method: 'POST',
      headers: {
          // 'Authorization': `Bearer ${response.Zi.accessToken}`,
          'Content-Type': 'application/json',
          // 'access_token': `${response.Zi.accessToken}`
      },
      body: JSON.stringify(userObject)
    }

    fetch(`/api/auth/google_oauth2/callback`, requestOptions)
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    
}

    useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1032769371055-00s80d3s77u4flepebjgnbc43dsvfpk0.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )

    google.accounts.id.prompt();

    
  }, []);
  return (
    <Wrapper>
      
      <Logo>Reciplease</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div id="signInDiv"></div>
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
          
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
