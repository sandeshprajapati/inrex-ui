import React from "react";
import { useKeycloak } from "../contexts/KeycloakContext";
import ProfileInfo from "./profile/ProfileInfo";
import FundManagement from "./profile/FundManagement";

function UserProfile() {
  const { userInfo, getToken } = useKeycloak();

  // Combine Keycloak user info with additional profile data
  const userData = {
    name: userInfo?.name || "John Doe",
    email: userInfo?.email || "john.doe@example.com",
    phone: "+91 9876543210", // Add this to user profile
    panCard: "ABCDE1234F", // Add this to user profile
    accountType: "Individual",
    joinDate: "August 2023",
    kycStatus: "Verified",
    tradingExperience: "2+ Years",
  };

  // Fund data - Replace with actual data from your backend
  const fundData = {
    availableBalance: 150000.0,
    totalDeposited: 500000.0,
    totalWithdrawn: 50000.0,
    pendingTransactions: [
      {
        id: 1,
        type: "Deposit",
        amount: 25000.0,
        status: "Pending",
        date: "2023-08-18",
        reference: "DEP123456",
      },
      {
        id: 2,
        type: "Withdrawal",
        amount: 10000.0,
        status: "Processing",
        date: "2023-08-17",
        reference: "WIT789012",
      },
    ],
  };

  // Keep the token copy functionality
  const copyToken = () => {
    navigator.clipboard.writeText(getToken());
    alert("Token copied to clipboard!");
  };

  return (
    <div className="container-fluid py-3">
      <div className="row g-3">
        <div className="col-lg-4">
          <ProfileInfo user={userData} />

          {/* Debug section for development - can be removed in production */}
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <h6 className="mb-3">Development Info</h6>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={copyToken}
              >
                Copy Auth Token
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <FundManagement fundData={fundData} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
