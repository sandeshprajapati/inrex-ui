import React from "react";

import { formatCurrency } from "../../utils/format";

function TopMovers({ gainers, losers }) {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-transparent border-bottom-0">
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-up-arrow text-success fs-4 me-2"></i>
              <h5 className="card-title mb-0">Top Gainers</h5>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {gainers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="list-group-item border-0 py-3"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">{stock.symbol}</h6>
                      <div className="text-muted small">
                        {formatCurrency(stock.price)}
                      </div>
                    </div>
                    <span className="badge bg-success-subtle text-success px-3 py-2">
                      <i className="bi bi-arrow-up-right me-1"></i>
                      {stock.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-transparent border-bottom-0">
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-down-arrow text-danger fs-4 me-2"></i>
              <h5 className="card-title mb-0">Top Losers</h5>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {losers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="list-group-item border-0 py-3"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">{stock.symbol}</h6>
                      <div className="text-muted small">
                        {formatCurrency(stock.price)}
                      </div>
                    </div>
                    <span className="badge bg-danger-subtle text-danger px-3 py-2">
                      <i className="bi bi-arrow-down-right me-1"></i>
                      {stock.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMovers;
