import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { UserProvider } from "./context/user";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
  }

  body {
    font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
`;
//const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider >
        <App />
      </UserProvider>
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root')
);
