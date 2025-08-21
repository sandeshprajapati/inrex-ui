import React, { useState } from "react";
import TradeModal from "./TradeModal";
import { formatCurrency } from "../utils/format";

function Watchlist() {
  const [tradeModal, setTradeModal] = useState({
    isOpen: false,
    symbol: "",
    type: "",
    lastPrice: 0,
  });

  const [stocks] = useState([
    {
      symbol: "RELIANCE",
      ltp: 2950.5,
      prevClose: 2914.0,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "TCS",
      ltp: 3450.0,
      prevClose: 3465.5,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "INFY",
      ltp: 1650.1,
      prevClose: 1636.9,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "HDFCBANK",
      ltp: 1720.0,
      prevClose: 1717.4,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "SBIN",
      ltp: 610.3,
      prevClose: 611.5,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "BHARTIARTL",
      ltp: 890.75,
      prevClose: 882.4,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "ITC",
      ltp: 445.6,
      prevClose: 446.9,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
    {
      symbol: "WIPRO",
      ltp: 420.25,
      prevClose: 417.5,
      get change() {
        return this.ltp - this.prevClose;
      },
      get changePercent() {
        return (this.change / this.prevClose) * 100;
      },
    },
  ]);

  const handleBuy = (symbol, lastPrice) => {
    setTradeModal({
      isOpen: true,
      symbol,
      type: "BUY",
      lastPrice,
    });
  };

  const handleSell = (symbol, lastPrice) => {
    setTradeModal({
      isOpen: true,
      symbol,
      type: "SELL",
      lastPrice,
    });
  };

  const handleDelete = (symbol) => {
    console.log(`Removing ${symbol} from watchlist`);
    // Add your delete logic here
  };

  return (
    <>
      <div className="h-100">
        <style>
          {`
          .stock-row .action-buttons {
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
          }
          .stock-row:hover .action-buttons {
            opacity: 1;
          }
          .stock-symbol {
            position: relative;
          }
          .action-buttons {
            position: absolute;
            right: -8px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            padding-left: 8px;
          }
        `}
        </style>
        <div className="card shadow-sm h-100">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-up me-2"></i>
              <span className="fs-5">Market Watch</span>
            </div>
            <span className="badge bg-light text-primary">
              {stocks.length} Stocks
            </span>
          </div>

          <div className="card-body p-0">
            <div className="p-2 border-bottom bg-light sticky-top">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search stocks by name or symbol..."
                  className="form-control form-control-sm border-start-0 ps-0"
                  aria-label="Search stocks"
                />
              </div>
            </div>

            <div
              className="table-responsive"
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              <table className="table table-hover mb-0">
                <thead className="table-light sticky-top">
                  <tr>
                    <th className="border-0">Symbol</th>
                    <th className="border-0 text-end">LTP</th>
                    <th className="border-0 text-end">Change</th>
                    <th className="border-0 text-end">Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol} className="stock-row">
                      <td className="fw-medium">
                        <span>{stock.symbol}</span>
                      </td>
                      <td className="text-end fw-medium">
                        {formatCurrency(stock.ltp)}
                      </td>
                      <td
                        className={`text-end ${
                          stock.change >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        <span className="fw-medium">
                          {stock.change >= 0 ? "+" : ""}
                          {Math.abs(stock.change).toFixed(2)}
                        </span>
                      </td>
                      <td
                        className={`text-end position-relative ${
                          stock.changePercent >= 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        <span className="fw-medium">
                          {stock.changePercent >= 0 ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                        <div className="action-buttons">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-success py-0 px-2"
                              onClick={() => handleBuy(stock.symbol, stock.ltp)}
                              title="Buy"
                            >
                              <i className="bi bi-cart-plus"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger py-0 px-2"
                              onClick={() =>
                                handleSell(stock.symbol, stock.ltp)
                              }
                              title="Sell"
                            >
                              <i className="bi bi-cart-dash"></i>
                            </button>
                            <button
                              className="btn btn-outline-secondary py-0 px-2"
                              onClick={() => handleDelete(stock.symbol)}
                              title="Remove from Watchlist"
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <TradeModal
        isOpen={tradeModal.isOpen}
        onClose={() => setTradeModal({ ...tradeModal, isOpen: false })}
        symbol={tradeModal.symbol}
        type={tradeModal.type}
        lastPrice={tradeModal.lastPrice}
      />
    </>
  );
}

export default Watchlist;
