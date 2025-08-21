import React, { useState, useEffect } from "react";
import { formatCurrency } from "../utils/format";

function TradeModal({ isOpen, onClose, symbol, type, lastPrice }) {
  const [quantity, setQuantity] = useState("1");
  const [orderType, setOrderType] = useState("MARKET");
  const [price, setPrice] = useState(lastPrice?.toString() || "");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [productType, setProductType] = useState("CNC");
  const [tradeType, setTradeType] = useState(type || "BUY");

  // Update tradeType when type prop changes
  useEffect(() => {
    if (type) {
      setTradeType(type);
    }
  }, [type]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      symbol,
      type: tradeType,
      quantity,
      orderType,
      price,
      triggerPrice,
      productType,
    });
    onClose();
  };

  return (
    <div
      className={`modal d-block trade-modal ${tradeType.toLowerCase()}-mode`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <style>
        {`
          .trade-modal .modal-content {
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
          }
          .trade-modal.buy-mode .modal-content {
            border-top: 3px solid var(--bs-success);
          }
          .trade-modal.sell-mode .modal-content {
            border-top: 3px solid var(--bs-danger);
          }
          .trade-modal .btn-trade-type {
            padding: 0.5rem 1.5rem;
            font-size: 0.875rem;
            min-width: 90px;
            transition: all 0.3s ease;
          }
          .trade-modal .btn-trade-type:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .trade-modal .btn-success:hover,
          .trade-modal .btn-danger:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
          }
        `}
      </style>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h5 className="modal-title">{symbol}</h5>
              <div className="btn-group mx-auto">
                <button
                  type="button"
                  className={`btn btn-trade-type fw-bold ${
                    tradeType === "BUY"
                      ? "btn-success text-white"
                      : "btn-outline-success"
                  }`}
                  onClick={() => setTradeType("BUY")}
                  style={{
                    borderRadius: "20px 0 0 20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="bi bi-cart-plus me-1"></i>
                  BUY
                </button>
                <button
                  type="button"
                  className={`btn btn-trade-type fw-bold ${
                    tradeType === "SELL"
                      ? "btn-danger text-white"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => setTradeType("SELL")}
                  style={{
                    borderRadius: "0 20px 20px 0",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="bi bi-cart-dash me-1"></i>
                  SELL
                </button>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="btn-group w-100">
                  <button
                    type="button"
                    className={`btn ${
                      productType === "CNC"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setProductType("CNC")}
                  >
                    NRML
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      productType === "MIS"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setProductType("MIS")}
                  >
                    MIS
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="btn-group w-100">
                  <button
                    type="button"
                    className={`btn ${
                      orderType === "MARKET"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setOrderType("MARKET")}
                  >
                    MARKET
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      orderType === "LIMIT"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setOrderType("LIMIT")}
                  >
                    LIMIT
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>

              {orderType === "LIMIT" && (
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <div className="input-group">
                    <span className="input-group-text">INR</span>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.05"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Trigger Price (Optional)</label>
                <div className="input-group">
                  <span className="input-group-text">INR</span>
                  <input
                    type="number"
                    className="form-control"
                    value={triggerPrice}
                    onChange={(e) => setTriggerPrice(e.target.value)}
                    step="0.05"
                  />
                </div>
              </div>

              <div className="alert alert-info mb-3">
                <div className="d-flex justify-content-between">
                  <span>Market Price:</span>
                  <span>{formatCurrency(lastPrice)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Value:</span>
                  <span>
                    {formatCurrency(
                      parseFloat(quantity) *
                        (orderType === "LIMIT"
                          ? parseFloat(price || 0)
                          : lastPrice)
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`btn w-100 py-3 fw-bold fs-5 ${
                  tradeType === "BUY" ? "btn-success" : "btn-danger"
                }`}
                style={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {tradeType === "BUY" ? (
                  <>
                    <i className="bi bi-cart-plus me-2"></i>Buy {symbol}
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-dash me-2"></i>Sell {symbol}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
