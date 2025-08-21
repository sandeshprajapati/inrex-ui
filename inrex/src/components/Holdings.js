import React, { useState } from "react";
import { formatCurrency } from "../utils/format";

function Holdings() {
  const [sortColumn, setSortColumn] = useState("symbol");
  const [sortOrder, setSortOrder] = useState("asc");

  const formatPercentage = (value) => {
    return value.toFixed(2) + "%";
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const holdings = [
    {
      symbol: "RELIANCE",
      quantity: 50,
      avgPrice: 2850.75,
      ltp: 2950.5,
      currentValue: 147525.0,
      pnl: 4987.5,
      dayChange: 1.25,
      pnlPercentage: 3.5,
    },
    {
      symbol: "TCS",
      quantity: 25,
      avgPrice: 3400.0,
      ltp: 3450.0,
      currentValue: 86250,
      pnl: 1250.0,
      dayChange: -0.45,
      pnlPercentage: 1.47,
    },
    {
      symbol: "HDFCBANK",
      quantity: 100,
      avgPrice: 1680.5,
      ltp: 1720.0,
      currentValue: 172000,
      pnl: 3950.0,
      dayChange: 0.15,
      pnlPercentage: 2.35,
    },
    {
      symbol: "INFY",
      quantity: 75,
      avgPrice: 1620.3,
      ltp: 1650.1,
      currentValue: 123757.5,
      pnl: 2235.0,
      dayChange: 0.8,
      pnlPercentage: 1.84,
    },
    {
      symbol: "WIPRO",
      quantity: 200,
      avgPrice: 410.25,
      ltp: 420.25,
      currentValue: 84050,
      pnl: 2000.0,
      dayChange: 0.65,
      pnlPercentage: 2.44,
    },
  ];

  const totalInvestment = holdings.reduce(
    (total, stock) => total + stock.avgPrice * stock.quantity,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (total, stock) => total + stock.currentValue,
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercentage = (totalPnL / totalInvestment) * 100;

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const modifier = sortOrder === "asc" ? 1 : -1;

    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  return (
    <div className="container-fluid py-4" style={{ maxWidth: "1400px" }}>
      <style>
        {`
          .table tr {
            transition: background-color 0.15s ease-in-out;
          }
          .table tbody tr:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
          .card {
            transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.08)!important;
          }
        `}
      </style>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-wallet2 me-2"></i>
            Portfolio Holdings
          </h2>
          <p className="text-muted mb-0">
            Track and manage your stock investments
          </p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-download me-2"></i>
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 bg-light">
            <div className="card-body p-2">
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-1 bg-primary bg-opacity-10 p-2 me-2">
                  <i className="bi bi-graph-up text-primary small"></i>
                </div>
                <span className="text-muted small">Current Value</span>
              </div>
              <h5 className="mb-0 fw-semibold">
                {formatCurrency(totalCurrentValue)}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 bg-light">
            <div className="card-body p-2">
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-1 bg-success bg-opacity-10 p-2 me-2">
                  <i className="bi bi-cash-stack text-success small"></i>
                </div>
                <span className="text-muted small">Total Investment</span>
              </div>
              <h5 className="mb-0 fw-semibold">
                {formatCurrency(totalInvestment)}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0 bg-light">
            <div className="card-body p-2">
              <div className="d-flex align-items-center mb-2">
                <div className="rounded-1 bg-info bg-opacity-10 p-2 me-2">
                  <i className="bi bi-arrow-left-right text-info small"></i>
                </div>
                <span className="text-muted small">Day's P&L</span>
              </div>
              <h5
                className={`mb-0 fw-semibold ${
                  totalPnL >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {formatCurrency(totalPnL)}
                <small className="ms-1 fs-6">
                  ({totalPnLPercentage.toFixed(2)}%)
                </small>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-0 py-2">
          <div className="row align-items-center">
            <div className="col">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search small"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light border-0"
                  placeholder="Search holdings..."
                  aria-label="Search holdings"
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="btn-group">
                <button className="btn btn-light">
                  <i className="bi bi-funnel"></i>
                </button>
                <button className="btn btn-light">
                  <i className="bi bi-grid"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th
                  onClick={() => handleSort("symbol")}
                  style={{ cursor: "pointer" }}
                >
                  Stock{" "}
                  {sortColumn === "symbol" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("quantity")}
                  style={{ cursor: "pointer" }}
                >
                  Quantity{" "}
                  {sortColumn === "quantity" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("avgPrice")}
                  style={{ cursor: "pointer" }}
                >
                  Avg. Cost{" "}
                  {sortColumn === "avgPrice" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("ltp")}
                  style={{ cursor: "pointer" }}
                >
                  LTP{" "}
                  {sortColumn === "ltp" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("currentValue")}
                  style={{ cursor: "pointer" }}
                >
                  Current Value{" "}
                  {sortColumn === "currentValue" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("pnl")}
                  style={{ cursor: "pointer" }}
                >
                  P&L{" "}
                  {sortColumn === "pnl" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => handleSort("dayChange")}
                  style={{ cursor: "pointer" }}
                >
                  Day Change{" "}
                  {sortColumn === "dayChange" && (
                    <i
                      className={`bi bi-arrow-${
                        sortOrder === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedHoldings.map((stock) => (
                <tr key={stock.symbol}>
                  <td className="fw-medium py-1">
                    <small>{stock.symbol}</small>
                  </td>
                  <td className="font-monospace py-1">
                    <small>{stock.quantity}</small>
                  </td>
                  <td className="font-monospace py-1">
                    <small>{formatCurrency(stock.avgPrice)}</small>
                  </td>
                  <td className="font-monospace py-1">
                    <small>{formatCurrency(stock.ltp)}</small>
                  </td>
                  <td className="font-monospace py-1">
                    <small>{formatCurrency(stock.currentValue)}</small>
                  </td>
                  <td
                    className={`font-monospace py-1 ${
                      stock.pnl >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    <small>
                      {formatCurrency(stock.pnl)}
                      <span className="ms-1">
                        ({stock.pnlPercentage.toFixed(2)}%)
                      </span>
                    </small>
                  </td>
                  <td
                    className={`font-monospace py-1 ${
                      stock.dayChange >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    <small>{formatPercentage(stock.dayChange)}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Holdings;
