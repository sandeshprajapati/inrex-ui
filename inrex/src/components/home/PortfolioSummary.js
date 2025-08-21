import React from "react";

import { formatCurrency } from "../../utils/format";

function PortfolioSummary({ investmentSummary }) {
  return (
    <div className="row g-1">
      {/* Total Investment */}
      <div className="col-xl-4 col-md-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <div className="flex-shrink-0">
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-wallet2 text-primary fs-4"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="text-muted mb-1">Total Investment</h6>
                <h4 className="fw-bold mb-0">
                  {formatCurrency(investmentSummary.totalInvestment)}
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <small className="text-muted">Monthly Change: </small>
              <span className="badge bg-success-subtle text-success ms-2">
                <i className="bi bi-graph-up me-1"></i>
                +12.5%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Value */}
      <div className="col-xl-4 col-md-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <div className="flex-shrink-0">
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="bi bi-pie-chart text-info fs-4"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="text-muted mb-1">Current Value</h6>
                <h4 className="fw-bold mb-0">
                  {formatCurrency(investmentSummary.totalValue)}
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <small className="text-muted">Overall P&L: </small>
              <span className="badge bg-success-subtle text-success ms-2">
                {formatCurrency(investmentSummary.overallPnL)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's P&L */}
      <div className="col-xl-4 col-md-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <div className="flex-shrink-0">
                <div
                  className={`bg-opacity-10 p-3 rounded ${
                    investmentSummary.todaysPnL >= 0
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  <i
                    className={`bi bi-graph-${
                      investmentSummary.todaysPnL >= 0 ? "up" : "down"
                    } 
                    ${
                      investmentSummary.todaysPnL >= 0
                        ? "text-success"
                        : "text-danger"
                    } fs-4`}
                  ></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="text-muted mb-1">Today's P&L</h6>
                <h4
                  className={`fw-bold mb-0 ${
                    investmentSummary.todaysPnL >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {formatCurrency(investmentSummary.todaysPnL)}
                </h4>
              </div>
            </div>
            <div className="progress" style={{ height: "4px" }}>
              <div
                className={`progress-bar ${
                  investmentSummary.todaysPnL >= 0 ? "bg-success" : "bg-danger"
                }`}
                style={{ width: "60%" }}
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSummary;
