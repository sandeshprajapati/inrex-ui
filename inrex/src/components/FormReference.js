import React, { useState } from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

function FormReference() {
  const [formData, setFormData] = useState({
    // Text inputs
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    website: "",

    // Select and textarea
    country: "",
    gender: "",
    bio: "",

    // Checkboxes
    newsletter: false,
    terms: false,
    notifications: false,

    // Radio buttons
    contactMethod: "",
    experience: "",

    // File and others
    profileImage: null,
    birthDate: "",
    salary: "",
    rating: 3,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.terms)
      newErrors.terms = "You must accept the terms and conditions";

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
      setSuccess("Form submitted successfully! Check console for data.");
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {success}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Complete Form Reference</h2>
            {/* Personal Information Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Personal Information</h5>
              </div>
              <div className="card-body">
                {/* Name Fields Row */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="required">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errors.firstName
                            ? "is-invalid"
                            : formData.firstName
                            ? "is-valid"
                            : ""
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label className="required">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errors.lastName
                            ? "is-invalid"
                            : formData.lastName
                            ? "is-valid"
                            : ""
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="required">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${
                      errors.email
                        ? "is-invalid"
                        : formData.email && /\S+@\S+\.\S+/.test(formData.email)
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text">
                    We'll never share your email with anyone else.
                  </small>
                </div>

                {/* Password Fields Row */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="required">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errors.password
                            ? "is-invalid"
                            : formData.password && formData.password.length >= 6
                            ? "is-valid"
                            : ""
                        }`}
                        placeholder="Enter password"
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                      <small className="form-text">
                        Minimum 6 characters required.
                      </small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label className="required">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errors.confirmPassword
                            ? "is-invalid"
                            : formData.confirmPassword &&
                              formData.password === formData.confirmPassword
                            ? "is-valid"
                            : ""
                        }`}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone and Website Row */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Birth Date and Salary Row */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>Expected Salary (INR)</label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="50000"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information Section */}
            <div className="card">
              <div className="card-header">Additional Information</div>
              <div className="card-body">
                {/* Country and Gender Row */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="required">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errors.country ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select Country</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="SG">Singapore</option>
                      </select>
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bio Textarea */}
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                  <small className="form-text">
                    Brief description for your profile.
                  </small>
                </div>

                {/* File Upload */}
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleInputChange}
                    className="form-control"
                    accept="image/*"
                  />
                  <small className="text-muted mt-1 d-block">
                    <i className="bi bi-info-circle me-1"></i>
                    Upload a profile picture (JPG, PNG, GIF).
                  </small>
                </div>

                {/* Range Input */}
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between">
                    <span>Experience Rating</span>
                    <span className="badge bg-primary">
                      {formData.rating}/5
                    </span>
                  </label>
                  <input
                    type="range"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="form-range"
                    min="1"
                    max="5"
                    step="1"
                  />
                  <small className="text-muted mt-1 d-block">
                    <i className="bi bi-star-half me-1"></i>
                    Rate your overall experience level.
                  </small>
                </div>
              </div>
            </div>
            {/* Preferences Section */}
            <div className="card">
              <div className="card-header">Preferences & Contact</div>
              <div className="card-body">
                {/* Radio Button Group */}
                <div className="form-group">
                  <label>Preferred Contact Method</label>
                  <div className="radio-group">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === "email"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="contact-email"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="contact-email"
                      >
                        Email
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === "phone"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="contact-phone"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="contact-phone"
                      >
                        Phone
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="sms"
                        checked={formData.contactMethod === "sms"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="contact-sms"
                      />
                      <label className="form-check-label" htmlFor="contact-sms">
                        SMS
                      </label>
                    </div>
                  </div>
                </div>

                {/* Experience Radio Group */}
                <div className="form-group">
                  <label>Professional Experience</label>
                  <div className="radio-group">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="experience"
                        value="beginner"
                        checked={formData.experience === "beginner"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="exp-beginner"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exp-beginner"
                      >
                        Beginner (0-2 years)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="experience"
                        value="intermediate"
                        checked={formData.experience === "intermediate"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="exp-intermediate"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exp-intermediate"
                      >
                        Intermediate (2-5 years)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="experience"
                        value="expert"
                        checked={formData.experience === "expert"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="exp-expert"
                      />
                      <label className="form-check-label" htmlFor="exp-expert">
                        Expert (5+ years)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="form-group">
                  <label>Notification Preferences</label>
                  <div className="checkbox-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="newsletter"
                      />
                      <label className="form-check-label" htmlFor="newsletter">
                        Subscribe to newsletter
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="notifications"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="notifications"
                      >
                        Receive push notifications
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className={`form-check-input ${
                          errors.terms ? "is-invalid" : ""
                        }`}
                        id="terms"
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() =>
                            alert("Terms and Conditions would open here")
                          }
                          className="link-button"
                        >
                          Terms and Conditions
                        </button>
                      </label>
                      {errors.terms && (
                        <div className="invalid-feedback">{errors.terms}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Form Actions */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="bi bi-check-circle me-2"></i>Submit Form
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={() => {
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          phone: "",
                          website: "",
                          country: "",
                          gender: "",
                          bio: "",
                          newsletter: false,
                          terms: false,
                          notifications: false,
                          contactMethod: "",
                          experience: "",
                          profileImage: null,
                          birthDate: "",
                          salary: "",
                          rating: 3,
                        });
                        setErrors({});
                        setSuccess("");
                      }}
                    >
                      <i className="bi bi-arrow-counterclockwise me-2"></i>Reset
                      Form
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Additional Button Examples */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Button Examples</h5>
              </div>
              <div className="card-body">
                <h6 className="mb-3">Button Variants</h6>
                <div className="d-flex gap-2 flex-wrap mb-4">
                  <button type="button" className="btn btn-primary">
                    Primary
                  </button>
                  <button type="button" className="btn btn-secondary">
                    Secondary
                  </button>
                  <button type="button" className="btn btn-success">
                    Success
                  </button>
                  <button type="button" className="btn btn-danger">
                    Danger
                  </button>
                  <button type="button" className="btn btn-outline-primary">
                    Outline
                  </button>
                </div>

                <h6 className="mb-3">Button Sizes</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <button type="button" className="btn btn-primary btn-sm">
                    Small
                  </button>
                  <button type="button" className="btn btn-primary">
                    Normal
                  </button>
                  <button type="button" className="btn btn-primary btn-lg">
                    Large
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormReference;
