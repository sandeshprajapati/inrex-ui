import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./keycloak";
import "./styles/KeycloakLogin.css";

function KeycloakLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const initRef = useRef(false);
  const tokenIntervalRef = useRef(null);

  useEffect(() => {
    const initializeKeycloak = async () => {
      // Prevent re-initialization
      if (initRef.current) {
        console.log(
          "🔄 Keycloak initialization already in progress or completed"
        );
        return;
      }

      initRef.current = true;

      try {
        setIsLoading(true);

        console.log("🚀 Initializing Keycloak...");

        const authenticated = await keycloak.init({
          onLoad: "login-required", // Options: 'login-required', 'check-sso'
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          checkLoginIframe: false, // Disable iframe check for better performance
          flow: "standard", // Use standard flow for better security
        });

        if (authenticated) {
          console.log("✅ User authenticated successfully");
          console.log("User Info:", {
            username: keycloak.tokenParsed?.preferred_username,
            email: keycloak.tokenParsed?.email,
            roles: keycloak.tokenParsed?.realm_access?.roles,
          });

          setIsAuthenticated(true);

          // Set up token refresh (only once)
          if (!tokenIntervalRef.current) {
            tokenIntervalRef.current = setInterval(() => {
              keycloak
                .updateToken(70)
                .then((refreshed) => {
                  if (refreshed) {
                    console.log("🔄 Token refreshed");
                  }
                })
                .catch(() => {
                  console.error("❌ Failed to refresh token");
                  keycloak.login();
                });
            }, 60000); // Check every minute
          }
        } else {
          console.warn("⚠️ User not authenticated, redirecting to login");
          keycloak.login();
        }
      } catch (err) {
        console.error("❌ Keycloak initialization error:", err);
        // Reset initialization state on error
        initRef.current = false;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeKeycloak();

    // Cleanup function
    return () => {
      if (tokenIntervalRef.current) {
        clearInterval(tokenIntervalRef.current);
        tokenIntervalRef.current = null;
      }
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="keycloak-container">
        <div className="loading-spinner"></div>
        <p>Initializing authentication...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>🔒 Authentication Error</h2>
        <p>Failed to initialize Keycloak: {error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Authenticated state - render the main app
  if (isAuthenticated) {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App keycloak={keycloak} />);
    return null;
  }

  return null;
}

export default KeycloakLogin;
