import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFunds() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "upi",
    bankAccount: "",
  });

  const [loading, setLoading] = useState(false);

  const bankAccounts = [
    { id: "hdfc1", name: "HDFC Bank - XX4563" },
    { id: "sbi1", name: "SBI - XX7890" },
    { id: "icici1", name: "ICICI Bank - XX2345" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message and redirect
      alert("Funds added successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to add funds. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* Page Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded">
              <i className="bi bi-wallet2 text-primary fs-4"></i>
            </div>
            <div className="ms-3">
              <h2 className="mb-1">Add Funds</h2>
              <p className="text-muted mb-0">
                Add money to your trading account
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Amount Input */}
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label">
                    Amount to Add
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">INR</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="amount"
                      name="amount"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="100"
                      max="1000000"
                    />
                  </div>
                  <div className="form-text">Min: 100 | Max: 10,00,000</div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <label className="form-label">Payment Method</label>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-check card border-primary">
                        <div className="card-body">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="upi"
                            value="upi"
                            checked={formData.paymentMethod === "upi"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor="upi"
                          >
                            <div className="d-flex align-items-center">
                              <i className="bi bi-phone text-primary fs-4 me-2"></i>
                              <div>
                                <div className="fw-medium">UPI</div>
                                <small className="text-muted">
                                  Instant transfer
                                </small>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check card">
                        <div className="card-body">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="netbanking"
                            value="netbanking"
                            checked={formData.paymentMethod === "netbanking"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label w-100"
                            htmlFor="netbanking"
                          >
                            <div className="d-flex align-items-center">
                              <i className="bi bi-bank text-primary fs-4 me-2"></i>
                              <div>
                                <div className="fw-medium">Net Banking</div>
                                <small className="text-muted">2-24 hours</small>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Account Selection */}
                <div className="mb-4">
                  <label htmlFor="bankAccount" className="form-label">
                    Select Bank Account
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="bankAccount"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose an account</option>
                    {bankAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    <i className="bi bi-shield-check me-1"></i>
                    Your bank details are secure
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-wallet2 me-2"></i>
                        Add Funds
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Information Card */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Important Information
              </h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-clock text-muted me-2"></i>
                  Funds will be available as per the chosen payment method
                </li>
                <li className="mb-2">
                  <i className="bi bi-shield-lock text-muted me-2"></i>
                  All transactions are secure and encrypted
                </li>
                <li>
                  <i className="bi bi-telephone text-muted me-2"></i>
                  For support, call us at 1800-XXX-XXXX
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFunds;
