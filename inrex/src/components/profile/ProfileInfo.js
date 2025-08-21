import React from "react";

function ProfileInfo({ user }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="text-center mb-4">
          <div className="avatar-wrapper mb-3">
            <div
              className="avatar-placeholder bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "100px",
                height: "100px",
                fontSize: "2.5rem",
                margin: "0 auto",
              }}
            >
              <i className="bi bi-person"></i>
            </div>
          </div>
          <h4 className="mb-1">{user.name}</h4>
          <div className="text-muted small">Member since {user.joinDate}</div>
          <div className="mt-2">
            <span className="badge bg-success-subtle text-success px-3 py-2">
              <i className="bi bi-patch-check me-1"></i>
              KYC {user.kycStatus}
            </span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="user-details">
          <div className="mb-3">
            <div className="text-muted small mb-1">Email</div>
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope text-primary me-2"></i>
              {user.email}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-muted small mb-1">Phone</div>
            <div className="d-flex align-items-center">
              <i className="bi bi-phone text-primary me-2"></i>
              {user.phone}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-muted small mb-1">PAN Card</div>
            <div className="d-flex align-items-center">
              <i className="bi bi-card-text text-primary me-2"></i>
              {user.panCard}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-muted small mb-1">Account Type</div>
            <div className="d-flex align-items-center">
              <i className="bi bi-person-badge text-primary me-2"></i>
              {user.accountType}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-muted small mb-1">Trading Experience</div>
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-up-arrow text-primary me-2"></i>
              {user.tradingExperience}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-outline-primary w-100">
            <i className="bi bi-pencil me-2"></i>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
