import React, { useState } from "react";

function Orders() {
  const [activeTab, setActiveTab] = useState("open");

  // Sample data - replace with actual data from your backend
  const openOrders = [
    {
      id: "ORD001",
      symbol: "RELIANCE",
      type: "BUY",
      quantity: 100,
      price: 2500.0,
      status: "PENDING",
      timestamp: "2025-08-17T10:30:00Z",
    },
    {
      id: "ORD002",
      symbol: "TCS",
      type: "SELL",
      quantity: 50,
      price: 3450.75,
      status: "OPEN",
      timestamp: "2025-08-17T10:35:00Z",
    },
  ];

  const executedOrders = [
    {
      id: "ORD003",
      symbol: "INFY",
      type: "BUY",
      quantity: 75,
      price: 1600.5,
      status: "EXECUTED",
      timestamp: "2025-08-17T09:45:00Z",
      executedAt: "2025-08-17T09:46:00Z",
    },
    {
      id: "ORD004",
      symbol: "HDFCBANK",
      type: "SELL",
      quantity: 30,
      price: 1680.25,
      status: "EXECUTED",
      timestamp: "2025-08-17T09:30:00Z",
      executedAt: "2025-08-17T09:31:00Z",
    },
  ];

  const completedOrders = [
    {
      id: "ORD005",
      symbol: "WIPRO",
      type: "BUY",
      quantity: 200,
      price: 450.75,
      status: "COMPLETED",
      timestamp: "2025-08-16T14:30:00Z",
      executedAt: "2025-08-16T14:31:00Z",
      completedAt: "2025-08-16T14:35:00Z",
      settlementDate: "2025-08-18",
    },
    {
      id: "ORD006",
      symbol: "TATAMOTORS",
      type: "SELL",
      quantity: 150,
      price: 625.5,
      status: "COMPLETED",
      timestamp: "2025-08-16T13:15:00Z",
      executedAt: "2025-08-16T13:16:00Z",
      completedAt: "2025-08-16T13:20:00Z",
      settlementDate: "2025-08-18",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning";
      case "OPEN":
        return "bg-info";
      case "EXECUTED":
        return "bg-success";
      case "COMPLETED":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const getTypeClass = (type) => {
    return type === "BUY" ? "text-success" : "text-danger";
  };

  const getActiveOrders = () => {
    switch (activeTab) {
      case "open":
        return openOrders;
      case "executed":
        return executedOrders;
      case "completed":
        return completedOrders;
      default:
        return [];
    }
  };

  return (
    <div className="container-fluid py-2" style={{ maxWidth: "1400px" }}>
      <style>
        {`
          .nav-tabs .nav-link {
            border: none;
            color: #6c757d;
            padding: 0.5rem 0.75rem;
            transition: all 0.15s ease-in-out;
            font-size: 0.875rem;
          }
          .nav-tabs .nav-link:hover {
            color: #000;
            background-color: rgba(0,0,0,0.02);
          }
          .nav-tabs .nav-link.active {
            color: #0d6efd;
            border-bottom: 2px solid #0d6efd;
            background-color: transparent;
          }
          .table tr {
            transition: background-color 0.15s ease-in-out;
          }
          .table tbody tr:hover {
            background-color: rgba(0,0,0,0.02);
          }
          .order-summary-card {
            transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .order-summary-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.08)!important;
          }
          .badge {
            font-weight: 500;
            padding: 0.5em 0.75em;
          }
        `}
      </style>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-card-list me-2"></i>
            Orders & Trades
          </h2>
          <p className="text-muted mb-0">
            Track your order history and trade executions
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light">
            <i className="bi bi-filter me-2"></i>
            Filter
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-download me-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Order Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card order-summary-card border-0 bg-light h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <i className="bi bi-clock-history text-warning"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Open Orders</h6>
                  <h4 className="mb-0">{openOrders.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card order-summary-card border-0 bg-light h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <i className="bi bi-check-circle text-success"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Executed Today</h6>
                  <h4 className="mb-0">{executedOrders.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card order-summary-card border-0 bg-light h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-check-all text-primary"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Completed Orders</h6>
                  <h4 className="mb-0">{completedOrders.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body py-2">
          <div className="row g-2 align-items-center mb-2">
            <div className="col">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search small"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light border-0"
                  placeholder="Search orders by ID or symbol..."
                />
              </div>
            </div>
            <div className="col-auto">
              <select className="form-select form-select-sm bg-light border-0">
                <option>All Types</option>
                <option>Buy Orders</option>
                <option>Sell Orders</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "open" ? "active" : ""}`}
                onClick={() => setActiveTab("open")}
              >
                <i className="bi bi-clock-history me-2"></i>
                Open Orders
                <span className="badge text-bg-light ms-2">
                  {openOrders.length}
                </span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "executed" ? "active" : ""
                }`}
                onClick={() => setActiveTab("executed")}
              >
                <i className="bi bi-check-circle me-2"></i>
                Executed Orders
                <span className="badge text-bg-light ms-2">
                  {executedOrders.length}
                </span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "completed" ? "active" : ""
                }`}
                onClick={() => setActiveTab("completed")}
              >
                <i className="bi bi-check-all me-2"></i>
                Completed Orders
                <span className="badge text-bg-light ms-2">
                  {completedOrders.length}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="bg-light">
              <tr>
                <th>Order ID</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Timestamp</th>
                {(activeTab === "executed" || activeTab === "completed") && (
                  <th>Executed At</th>
                )}
                {activeTab === "completed" && (
                  <>
                    <th>Completed At</th>
                    <th>Settlement Date</th>
                  </>
                )}
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getActiveOrders().map((order) => (
                <tr key={order.id} className="align-middle">
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-file-text text-muted me-2"></i>
                      <span>{order.id}</span>
                    </div>
                  </td>
                  <td>
                    <span className="fw-medium">{order.symbol}</span>
                  </td>
                  <td>
                    <span className={`${getTypeClass(order.type)} fw-medium`}>
                      <i
                        className={`bi bi-arrow-${
                          order.type === "BUY" ? "up" : "down"
                        }-circle me-1`}
                      ></i>
                      {order.type}
                    </span>
                  </td>
                  <td className="font-monospace">{order.quantity}</td>
                  <td className="font-monospace">{order.price}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(
                        order.status
                      )} bg-opacity-75`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {formatDate(order.timestamp)}
                    </div>
                  </td>
                  {(activeTab === "executed" || activeTab === "completed") && (
                    <td>
                      <div className="text-muted">
                        <i className="bi bi-check2 me-1"></i>
                        {formatDate(order.executedAt)}
                      </div>
                    </td>
                  )}
                  {activeTab === "completed" && (
                    <>
                      <td>
                        <div className="text-muted">
                          <i className="bi bi-check2-all me-1"></i>
                          {formatDate(order.completedAt)}
                        </div>
                      </td>
                      <td>
                        <div className="text-muted">
                          <i className="bi bi-calendar-event me-1"></i>
                          {order.settlementDate}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-light" title="View Details">
                        <i className="bi bi-eye"></i>
                      </button>
                      {activeTab === "open" && (
                        <button
                          className="btn btn-light text-danger"
                          title="Cancel Order"
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {getActiveOrders().length === 0 && (
          <div className="text-center py-5">
            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
              <i className="bi bi-inbox display-6 text-muted"></i>
            </div>
            <h5 className="text-muted mb-2">No {activeTab} orders found</h5>
            <p className="text-muted mb-4">
              {activeTab === "open"
                ? "Place a new order to see it here"
                : `Orders will appear here when they are ${activeTab}`}
            </p>
            {activeTab === "open" && (
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Place New Order
              </button>
            )}
          </div>
        )}
      </div>

      {getActiveOrders().length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {getActiveOrders().length} orders
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Orders;
