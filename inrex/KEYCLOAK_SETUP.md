# Keycloak OpenID Connect Integration Guide

This guide will help you set up Keycloak authentication for your React application.

## 📋 Prerequisites

- Keycloak server running (Docker or standalone)
- React application with keycloak-js package installed
- PostgreSQL database (optional, for production)

## 🚀 Keycloak Server Setup

### Option 1: Using Docker (Recommended for development)

```bash
# Run Keycloak with H2 database (development)
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest \
  start-dev

# Or with PostgreSQL (production-ready)
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -e KC_DB=postgres \
  -e KC_DB_URL=jdbc:postgresql://localhost:5432/keycloak \
  -e KC_DB_USERNAME=keycloak \
  -e KC_DB_PASSWORD=your_password \
  quay.io/keycloak/keycloak:latest \
  start
```

### Option 2: Download and Run Standalone

1. Download Keycloak from https://www.keycloak.org/downloads
2. Extract and run: `bin/kc.sh start-dev` (Linux/Mac) or `bin\kc.bat start-dev` (Windows)

## 🔧 Keycloak Configuration

### 1. Access Admin Console

- URL: http://localhost:8080
- Username: admin
- Password: admin

### 2. Create a Realm

1. Click "Create Realm"
2. Name: `inrex-realm` (or your preferred name)
3. Click "Create"

### 3. Create a Client

1. Go to "Clients" → "Create client"
2. **Client type**: OpenID Connect
3. **Client ID**: `inrex-app`
4. Click "Next"

#### Client Settings:

- **Client authentication**: OFF (public client)
- **Authorization**: OFF
- **Standard flow**: ON
- **Direct access grants**: ON
- **Implicit flow**: OFF
- **Service accounts roles**: OFF

#### Access Settings:

- **Root URL**: `http://localhost:3000`
- **Home URL**: `http://localhost:3000`
- **Valid redirect URIs**: `http://localhost:3000/*`
- **Valid post logout redirect URIs**: `http://localhost:3000/*`
- **Web origins**: `http://localhost:3000`

### 4. Create Users

1. Go to "Users" → "Add user"
2. Fill in user details:
   - **Username**: testuser
   - **Email**: test@example.com
   - **First name**: Test
   - **Last name**: User
   - **Email verified**: ON
3. Click "Create"

#### Set Password:

1. Go to "Credentials" tab
2. Set password: `password123`
3. **Temporary**: OFF
4. Click "Set password"

### 5. Create Roles (Optional)

1. Go to "Realm roles" → "Create role"
2. Create roles like: `user`, `admin`, `manager`

#### Assign Roles to User:

1. Go to "Users" → Select user → "Role mapping"
2. Click "Assign role"
3. Select the roles to assign

## ⚛️ React Application Configuration

### 1. Update keycloak.js Configuration

```javascript
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080/",
  realm: "inrex-realm",
  clientId: "inrex-app",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
```

### 2. Environment Variables (Recommended)

Create a `.env` file:

```env
REACT_APP_KEYCLOAK_URL=http://localhost:8080/
REACT_APP_KEYCLOAK_REALM=inrex-realm
REACT_APP_KEYCLOAK_CLIENT_ID=inrex-app
```

Update `keycloak.js`:

```javascript
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
```

## 🧪 Testing the Integration

### 1. Start Your React App

```bash
npm start
```

### 2. Test Authentication Flow

1. Visit http://localhost:3000
2. Should redirect to Keycloak login page
3. Login with: `testuser` / `password123`
4. Should redirect back to your app
5. Check browser console for user info

### 3. Test Protected Routes

- `/dashboard` - Requires 'user' or 'admin' role
- `/form-reference` - Requires authentication
- `/profile` - Shows user information

## 🔐 Security Best Practices

### 1. Production Configuration

```javascript
// For production, use HTTPS and proper domains
const keycloakConfig = {
  url: "https://your-keycloak-domain.com/",
  realm: "production-realm",
  clientId: "production-client",
};
```

### 2. Token Management

- Tokens are automatically refreshed every minute
- Access tokens expire in 5 minutes (configurable)
- Refresh tokens expire in 30 minutes (configurable)

### 3. CORS Configuration

In Keycloak Admin Console:

1. Go to "Clients" → Your Client → "Advanced"
2. Set **Web origins** to your production domain
3. Set **CORS allowed origins** appropriately

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check Web origins in client settings
2. **Redirect URI Invalid**: Verify redirect URIs match exactly
3. **Token Expired**: Check if automatic refresh is working
4. **User Not Found**: Verify user exists and has correct roles

### Debug Steps:

1. Check browser console for errors
2. Verify Keycloak is running on port 8080
3. Check network tab for failed requests
4. Verify realm and client names match exactly

### Getting Help:

- Check Keycloak logs: `docker logs <container-id>`
- Enable debug logging in React app
- Use browser developer tools
- Check Keycloak documentation

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak JavaScript Adapter](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter)
- [React Keycloak Integration Examples](https://github.com/react-keycloak/react-keycloak)

## 🎯 Next Steps

1. Configure email settings for password reset
2. Set up social login providers (Google, Facebook, etc.)
3. Implement role-based access control
4. Set up proper SSL certificates for production
5. Configure session management and timeouts
