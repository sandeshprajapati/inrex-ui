import React, { useState } from "react";
import fundService from "../../services/fundService";
import { formatCurrency } from "../../utils/format";

function FundManagement({ fundData, onFundUpdate }) {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const fundData = {
        amount: parseFloat(amount),
        userId: localStorage.getItem("userId") || "user123", // Get from auth context
        description: `${transactionType} via cash payment`,
      };

      let result;
      if (transactionType === "deposit") {
        result = await fundService.addFunds(fundData);
        setMessage({
          type: "success",
          text: `Successfully added ${formatCurrency(amount)} to your account`,
        });
      } else {
        result = await fundService.withdrawFunds(fundData);
        setMessage({
          type: "success",
          text: `Successfully withdrawn ${formatCurrency(
            amount
          )} from your account`,
        });
      }

      // Clear form
      setAmount("");

      // Notify parent component to refresh data
      if (onFundUpdate) {
        onFundUpdate(result);
      }

      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage({
        type: "error",
        text: error.message || "Transaction failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row g-3">
      {/* Fund Summary Cards */}
      <div className="col-12">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <i className="bi bi-wallet2 text-primary fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Available Balance</h6>
                    <h4 className="fw-bold mb-0">
                      {formatCurrency(fundData.availableBalance)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <i className="bi bi-arrow-down-circle text-success fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Deposited</h6>
                    <h4 className="fw-bold mb-0">
                      {formatCurrency(fundData.totalDeposited)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="bg-danger bg-opacity-10 p-3 rounded">
                      <i className="bi bi-arrow-up-circle text-danger fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Withdrawn</h6>
                    <h4 className="fw-bold mb-0">
                      {formatCurrency(fundData.totalWithdrawn)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Funds Form */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-transparent border-bottom-0 pb-0">
            <h5 className="card-title mb-0">Add/Withdraw Funds</h5>
          </div>
          <div className="card-body">
            {/* Message Display */}
            {message.text && (
              <div
                className={`alert ${
                  message.type === "success" ? "alert-success" : "alert-danger"
                } alert-dismissible fade show`}
                role="alert"
              >
                {message.text}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage({ type: "", text: "" })}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="btn-group w-100">
                  <button
                    type="button"
                    className={`btn ${
                      transactionType === "deposit"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setTransactionType("deposit")}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Deposit
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      transactionType === "withdraw"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setTransactionType("withdraw")}
                  >
                    <i className="bi bi-dash-circle me-2"></i>
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Payment Type Indicator */}
              <div className="mb-3">
                <label className="form-label">Payment Type</label>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success-subtle text-success fs-6 px-3 py-2">
                    <i className="bi bi-cash me-2"></i>
                    Cash Payment
                  </span>
                  <small className="text-muted ms-2">
                    All transactions are processed as cash payments
                  </small>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                onClick={handleSubmit}
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
                    {transactionType === "deposit" ? (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Funds
                      </>
                    ) : (
                      <>
                        <i className="bi bi-dash-circle me-2"></i>
                        Withdraw Funds
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-transparent border-bottom-0 pb-0">
            <h5 className="card-title mb-0">Recent Transactions</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {fundData.pendingTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <span
                          className={`badge ${
                            transaction.type === "Deposit"
                              ? "bg-success-subtle text-success"
                              : "bg-danger-subtle text-danger"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td>{formatCurrency(transaction.amount)}</td>
                      <td>
                        <span className="badge bg-warning-subtle text-warning">
                          {transaction.status}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(transaction.date).toLocaleDateString()}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundManagement;
