import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "demo@mail.com",
    password: "password",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Login successful! Redirecting to home...");
      console.log("Login Data:", formData);

      // Simulate login success and redirect to home page
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  return (
    <div className="App page-container">
      <main className="page-main">
        {success && <div className="success-message small py-1">{success}</div>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-header text-center py-2">
            <h5 className="mb-0">Welcome Back!</h5>
          </div>

          <div className="form-group mb-2">
            <label className="required small mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-control form-control-sm ${
                errors.email
                  ? "is-invalid"
                  : formData.email && /\S+@\S+\.\S+/.test(formData.email)
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label className="required small mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-control form-control-sm ${
                errors.password
                  ? "is-invalid"
                  : formData.password && formData.password.length >= 6
                  ? "is-valid"
                  : ""
              }`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group form-check-group">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                name="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Sign In
            </button>
          </div>

          <div className="form-actions">
            <p>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Password reset functionality would be implemented here"
                  )
                }
                className="link-button"
              >
                Forgot your password?
              </button>
            </p>

            <hr className="form-divider" />

            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/form-reference")}
                className="link-button bold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default LoginForm;
