import Keycloak from "keycloak-js";

// Keycloak configuration
const keycloakConfig = {
  url: "http://localhost:8080/", // Your Keycloak server URL
  realm: "inrex-realm", // Replace with your realm name
  clientId: "inrex-client", // Replace with your client ID
};

// Create Keycloak instance only once (singleton pattern)
let keycloakInstance = null;

const getKeycloakInstance = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak(keycloakConfig);
  }
  return keycloakInstance;
};

// Export the singleton instance
const keycloak = getKeycloakInstance();

export default keycloak;
