import React, { useState } from "react";

import { formatCurrency } from "../../utils/format";

function FundManagement({ fundData }) {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle fund transaction logic here
    console.log("Transaction:", { type: transactionType, amount });
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
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
              >
                {transactionType === "deposit" ? "Add Funds" : "Withdraw Funds"}
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
