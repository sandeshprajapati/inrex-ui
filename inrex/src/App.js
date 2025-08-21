import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Keycloak Context
import { KeycloakProvider } from "./contexts/KeycloakContext";

// Components
import Layout from "./components/Layout";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import FormReference from "./components/FormReference";
import Holdings from "./components/Holdings";
import UserProfile from "./components/UserProfile";
import Orders from "./components/Orders";
import AddFunds from "./components/AddFunds";
import { ProtectedRoute } from "./components/ProtectedRoute";

function AppContent() {
  // Since we're using Keycloak, we don't need the old login form
  // All routes will be protected by Keycloak
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-reference"
          element={
            <ProtectedRoute>
              <FormReference />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-funds"
          element={
            <ProtectedRoute>
              <AddFunds />
            </ProtectedRoute>
          }
        />
        {/* Keep the old login form as a fallback */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Layout>
  );
}

function App({ keycloak }) {
  return (
    <KeycloakProvider keycloak={keycloak}>
      <Router>
        <AppContent />
      </Router>
    </KeycloakProvider>
  );
}

export default App;
