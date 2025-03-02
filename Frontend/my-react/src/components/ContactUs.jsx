import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/advisoryData.json";

const MOAdvice = () => {
  const [activeTab, setActiveTab] = useState("closed");
  const { advisories, investors } = data;

  const AdvisoryCard = ({ advice }) => {
    const isNegative = advice.netGainLoss.startsWith("-");
    const percentage = Math.abs(parseFloat(advice.netGainLoss));

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{advice.name}</h3>
            <p className="text-sm text-gray-500">{advice.ticker}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${isNegative ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {isNegative ? "▼" : "▲"} {percentage}%
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Entry Price</span>
            <span className="font-medium">{advice.entryPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Exit Price</span>
            <span className="font-medium">{advice.exitPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target Price</span>
            <span className="font-medium text-blue-600">{advice.target}</span>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Exited on {advice.exitDate}</p>
          </div>
        </div>
      </div>
    );
  };

  const InvestorRow = ({ investor }) => {
    const getChangeIndicator = (change) => {
      if (change === "-") return null;
      const isPositive = !change.startsWith("-");
      const value = change.replace(/[^0-9.]/g, "");
      return (
        <span className={`inline-flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "▲" : "▼"} {value}%
        </span>
      );
    };

    return (
      <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
        <td className="p-4 font-medium text-gray-900">{investor.name}</td>
        <td className="p-4 font-semibold">{investor.portfolioValue}</td>
        <td className="p-4 text-center">{investor.numStocks}</td>
        <td className="p-4 text-gray-700">{investor.topHoldings}</td>
        <td className="p-4">{getChangeIndicator(investor.increase)}</td>
        <td className="p-4">{getChangeIndicator(investor.decrease)}</td>
        <td className="p-4 text-gray-600 text-sm">{investor.sectorHoldings}</td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-blue-600 text-white px-3 py-1 rounded mr-3">💰</span>
            Investment Insights
          </h1>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/ace-investors" className="text-gray-600 hover:text-blue-600 transition-colors">
              Ace Investors
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Advisory Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Advisory Products</h1>
            <div className="bg-white rounded-lg p-1 shadow-inner">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "active" 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Active ({advisories.active.length})
              </button>
              <button
                onClick={() => setActiveTab("closed")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "closed" 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Closed ({advisories.closed.length})
              </button>
            </div>
          </div>

          {advisories[activeTab].length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4 text-gray-300">📭</div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                No {activeTab} advisories
              </h3>
              <p className="text-gray-400">Check back later for new investment opportunities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisories[activeTab].map((advice, index) => (
                <AdvisoryCard key={index} advice={advice} />
              ))}
            </div>
          )}
        </section>

        {/* Investors Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ace Investors Portfolios</h2>
            <p className="text-gray-600 max-w-3xl">
              Track institutional investors and market leaders with detailed portfolio breakdowns,
              sector allocations, and recent position changes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Investor", "Portfolio Value", "Stocks", "Top Holdings", "Increase", "Decrease", "Sectors"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {investors.map((investor, index) => (
                    <InvestorRow key={index} investor={investor} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MOAdvice;