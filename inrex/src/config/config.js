// API Configuration Service
// Manages environment-based configuration for API endpoints

class ConfigService {
  constructor() {
    // Validate required environment variables
    this.validateConfig();
  }

  // API Base URLs
  get apiBaseUrl() {
    return process.env.REACT_APP_API_BASE_URL || "http://localhost:9090";
  }

  get authServiceUrl() {
    return (
      process.env.REACT_APP_AUTH_SERVICE_URL ||
      `${this.apiBaseUrl}/auth-service`
    );
  }

  get paymentServiceUrl() {
    return (
      process.env.REACT_APP_PAYMENT_SERVICE_URL ||
      `${this.apiBaseUrl}/payment-service`
    );
  }

  get userServiceUrl() {
    return (
      process.env.REACT_APP_USER_SERVICE_URL ||
      `${this.apiBaseUrl}/user-service`
    );
  }

  // Keycloak Configuration
  get keycloakConfig() {
    return {
      url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
      realm: process.env.REACT_APP_KEYCLOAK_REALM || "inrex",
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "inrex-client",
    };
  }

  // Authentication Endpoints
  get authEndpoints() {
    return {
      login: process.env.REACT_APP_AUTH_LOGIN_ENDPOINT || "/api/v1/auth/login",
      logout:
        process.env.REACT_APP_AUTH_LOGOUT_ENDPOINT || "/api/v1/auth/logout",
      refresh:
        process.env.REACT_APP_AUTH_REFRESH_ENDPOINT || "/api/v1/auth/refresh",
      verify:
        process.env.REACT_APP_AUTH_VERIFY_ENDPOINT || "/api/v1/auth/verify",
    };
  }

  // Environment Settings
  get environment() {
    return process.env.REACT_APP_ENVIRONMENT || "development";
  }

  get isProduction() {
    return this.environment === "production";
  }

  get isDevelopment() {
    return this.environment === "development";
  }

  get debugMode() {
    return process.env.REACT_APP_DEBUG_MODE === "true";
  }

  get logLevel() {
    return process.env.REACT_APP_LOG_LEVEL || "info";
  }

  // Service-specific URL builders
  buildAuthUrl(endpoint = "") {
    return `${this.authServiceUrl}${endpoint}`;
  }

  buildPaymentUrl(endpoint = "") {
    return `${this.paymentServiceUrl}${endpoint}`;
  }

  buildUserUrl(endpoint = "") {
    return `${this.userServiceUrl}${endpoint}`;
  }

  // Get full authentication URL
  getAuthLoginUrl() {
    return this.buildAuthUrl(this.authEndpoints.login);
  }

  getAuthLogoutUrl() {
    return this.buildAuthUrl(this.authEndpoints.logout);
  }

  getAuthRefreshUrl() {
    return this.buildAuthUrl(this.authEndpoints.refresh);
  }

  getAuthVerifyUrl() {
    return this.buildAuthUrl(this.authEndpoints.verify);
  }

  // Validation
  validateConfig() {
    const required = ["REACT_APP_API_BASE_URL"];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      console.warn("Missing environment variables:", missing);
      console.warn(
        "Using default values. Consider setting these in your .env file"
      );
    }

    if (this.debugMode) {
      this.logConfig();
    }
  }

  logConfig() {
    console.log("🔧 Configuration loaded:", {
      environment: this.environment,
      apiBaseUrl: this.apiBaseUrl,
      authServiceUrl: this.authServiceUrl,
      paymentServiceUrl: this.paymentServiceUrl,
      userServiceUrl: this.userServiceUrl,
      keycloak: this.keycloakConfig,
      debugMode: this.debugMode,
    });
  }
}

// Export singleton instance
const config = new ConfigService();
export default config;
