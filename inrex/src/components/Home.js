import React from "react";
import Watchlist from "./Watchlist";
import PortfolioSummary from "./home/PortfolioSummary";
import TopMovers from "./home/TopMovers";
import RecentOrders from "./home/RecentOrders";

function Home() {
  // Dummy data for investment summary
  const investmentSummary = {
    totalInvestment: 613582.5,
    fundAvailable: 150000.0,
    totalValue: 680000.0,
    todaysPnL: 12500.75,
    overallPnL: 66417.5,
  };

  // Dummy data for top movers
  const topMovers = {
    gainers: [
      { symbol: "TCS", change: "+3.45%", price: 3567.8 },
      { symbol: "HDFCBANK", change: "+2.80%", price: 1678.9 },
      { symbol: "INFY", change: "+2.15%", price: 1456.75 },
    ],
    losers: [
      { symbol: "TATASTEEL", change: "-2.75%", price: 897.6 },
      { symbol: "SUNPHARMA", change: "-2.30%", price: 789.45 },
      { symbol: "ONGC", change: "-1.95%", price: 234.56 },
    ],
  };

  // Dummy data for recent orders
  const recentOrders = [
    {
      symbol: "RELIANCE",
      type: "BUY",
      quantity: 10,
      price: 2456.75,
      status: "COMPLETE",
    },
    {
      symbol: "HDFC",
      type: "SELL",
      quantity: 15,
      price: 1789.3,
      status: "PENDING",
    },
    {
      symbol: "WIPRO",
      type: "BUY",
      quantity: 50,
      price: 456.9,
      status: "COMPLETE",
    },
  ];

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100">
      <div className="bg-light border-end">
        <Watchlist />
      </div>
      <div className="flex-grow-1 bg-body-tertiary p-1">
        <div className="container-fluid">
          {/* Portfolio Summary */}
          <PortfolioSummary investmentSummary={investmentSummary} />

          {/* Top Movers */}
          <div className="mt-3">
            <TopMovers gainers={topMovers.gainers} losers={topMovers.losers} />
          </div>

          {/* Recent Orders */}
          <div className="row mt-3">
            <div className="col-12">
              <RecentOrders orders={recentOrders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
