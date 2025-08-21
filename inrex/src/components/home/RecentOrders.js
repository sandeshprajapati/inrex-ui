import React from "react";

import { formatCurrency } from "../../utils/format";

function RecentOrders({ orders }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-transparent border-bottom-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className="bi bi-clock-history text-primary fs-4 me-2"></i>
            <h5 className="card-title mb-0">Recent Orders</h5>
          </div>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-arrow-right me-1"></i>
            View All
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-sm align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-2">Symbol</th>
                <th className="py-2">Type</th>
                <th className="text-end py-2">Qty</th>
                <th className="text-end py-2">Price</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="fw-medium py-1">{order.symbol}</td>
                  <td className="py-1">
                    <span
                      className={`badge ${
                        order.type === "BUY"
                          ? "bg-success-subtle text-success"
                          : "bg-danger-subtle text-danger"
                      } py-1 px-2`}
                    >
                      <i
                        className={`bi bi-${
                          order.type === "BUY" ? "cart-plus" : "cart-dash"
                        } me-1 small`}
                      ></i>
                      <small>{order.type}</small>
                    </span>
                  </td>
                  <td className="text-end py-1">{order.quantity}</td>
                  <td className="text-end py-1">
                    {formatCurrency(order.price)}
                  </td>
                  <td className="text-center py-1">
                    <span
                      className={`badge ${
                        order.status === "COMPLETE"
                          ? "bg-success-subtle text-success"
                          : "bg-warning-subtle text-warning"
                      } py-1 px-2`}
                    >
                      <small>{order.status}</small>
                    </span>
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

export default RecentOrders;
