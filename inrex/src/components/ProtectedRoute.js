import React from "react";
import { useKeycloak } from "../contexts/KeycloakContext";

// Higher-order component for protecting routes
export const withAuth = (WrappedComponent, requiredRoles = []) => {
  return (props) => {
    const { isAuthenticated, hasRole, login } = useKeycloak();

    if (!isAuthenticated()) {
      return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <h2 className="mb-3">🔒 Authentication Required</h2>
            <p className="mb-4">
              You need to be logged in to access this page.
            </p>
            <button onClick={login} className="btn btn-primary">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
          </div>
        </div>
      );
    }

    // Check role-based access
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some((role) => hasRole(role));

      if (!hasRequiredRole) {
        return (
          <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="alert alert-danger text-center p-4">
              <h2 className="mb-3">🚫 Access Denied</h2>
              <p className="mb-2">
                You don't have the required permissions to access this page.
              </p>
              <p className="mb-0">Required roles: {requiredRoles.join(", ")}</p>
            </div>
          </div>
        );
      }
    }

    return <WrappedComponent {...props} />;
  };
};

// Component for protecting routes
export const ProtectedRoute = ({
  children,
  requiredRoles = [],
  fallback = null,
}) => {
  const { isAuthenticated, hasRole } = useKeycloak();

  if (!isAuthenticated()) {
    return (
      fallback || (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <h2 className="mb-3">🔒 Please log in to continue</h2>
          </div>
        </div>
      )
    );
  }

  // Check role-based access
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => hasRole(role));

    if (!hasRequiredRole) {
      return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="alert alert-danger text-center p-4">
            <h2 className="mb-3">🚫 Insufficient Permissions</h2>
            <p className="mb-0">Required roles: {requiredRoles.join(", ")}</p>
          </div>
        </div>
      );
    }
  }

  return children;
};
