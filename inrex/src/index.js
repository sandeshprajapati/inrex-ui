import React from "react";
import ReactDOM from "react-dom/client";
// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import KeycloakLogin from "./KeycloakLogin";
import reportWebVitals from "./reportWebVitals";

// Initialize the app with Keycloak authentication
const root = ReactDOM.createRoot(document.getElementById("root"));

// Use KeycloakLogin component to handle authentication
root.render(<KeycloakLogin />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
