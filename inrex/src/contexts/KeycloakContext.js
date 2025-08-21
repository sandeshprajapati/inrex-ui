import React, { createContext, useContext } from "react";

// Create Keycloak context
const KeycloakContext = createContext();

// Custom hook to use Keycloak
export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};

// Keycloak Provider component
export const KeycloakProvider = ({ children, keycloak }) => {
  // Helper functions
  const login = () => keycloak.login();

  const logout = () =>
    keycloak.logout({
      redirectUri: window.location.origin,
    });

  const register = () => keycloak.register();

  const hasRole = (role) => {
    return keycloak.tokenParsed?.realm_access?.roles?.includes(role) || false;
  };

  const hasRealmRole = (role) => {
    return keycloak.hasRealmRole(role);
  };

  const hasResourceRole = (role, resource) => {
    return keycloak.hasResourceRole(role, resource);
  };

  const getUserInfo = () => {
    if (!keycloak.tokenParsed) return null;

    return {
      id: keycloak.tokenParsed.sub,
      username: keycloak.tokenParsed.preferred_username,
      email: keycloak.tokenParsed.email,
      firstName: keycloak.tokenParsed.given_name,
      lastName: keycloak.tokenParsed.family_name,
      fullName: keycloak.tokenParsed.name,
      roles: keycloak.tokenParsed.realm_access?.roles || [],
      emailVerified: keycloak.tokenParsed.email_verified,
    };
  };

  const getToken = () => keycloak.token;

  const isAuthenticated = () => keycloak.authenticated;

  const updateToken = (minValidity = 5) => {
    return keycloak.updateToken(minValidity);
  };

  const contextValue = {
    keycloak,
    login,
    logout,
    register,
    hasRole,
    hasRealmRole,
    hasResourceRole,
    getUserInfo,
    getToken,
    isAuthenticated,
    updateToken,
    authenticated: keycloak.authenticated,
    token: keycloak.token,
    userInfo: getUserInfo(),
  };

  return (
    <KeycloakContext.Provider value={contextValue}>
      {children}
    </KeycloakContext.Provider>
  );
};
