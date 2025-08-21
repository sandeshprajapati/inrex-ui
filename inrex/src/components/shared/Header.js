import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useKeycloak } from "../../contexts/KeycloakContext";

function Header() {
  const location = useLocation();
  const { userInfo, logout, isAuthenticated } = useKeycloak();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-1">
        <div className="container-fluid px-2">
          <Link to="/" className="navbar-brand py-0">
            <i className="bi bi-currency-exchange me-1 small"></i>
            <span className="small">INRex</span>
          </Link>
          <button
            className="navbar-toggler py-1 px-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon small"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={`nav-link py-1 px-2 ${
                    isActive("/home") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-house-door me-1 small"></i>
                  <small>Home</small>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/holdings"
                  className={`nav-link py-1 px-2 ${
                    isActive("/holdings") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-graph-up me-1"></i> Holdings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/orders"
                  className={`nav-link ${isActive("/orders") ? "active" : ""}`}
                >
                  <i className="bi bi-card-list me-1"></i> Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/form-reference"
                  className={`nav-link ${
                    isActive("/form-reference") ? "active" : ""
                  }`}
                >
                  <i className="bi bi-file-text me-1"></i> Form Reference
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {userInfo?.fullName && (
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="userProfileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {userInfo.fullName}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userProfileDropdown"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="bi bi-person me-2"></i>
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                        type="button"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
