import React, { useState } from "react";
import data from "../data/stockData.json";

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Reusable components
  const PerformanceIndicator = ({ item }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">{item.label}</h2>
      <p className="text-xl font-semibold text-gray-900 my-1">{item.score}</p>
      <p className="text-sm text-gray-500">{item.remark}</p>
    </div>
  );

  const SWOTAnalysis = ({ item }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
      <p className="text-sm text-gray-500 mt-1">{item.label}</p>
    </div>
  );

  const FinancialTable = ({ headers, rows }) => (
    <table className="min-w-full border border-gray-300 mt-2">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          {headers.map((header, idx) => (
            <th key={idx} className="p-2 border">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="text-center border">
            {Object.values(row).map((value, idx) => (
              <td key={idx} className="p-2 border">
                {typeof value === "number" ? value.toLocaleString() : value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      {/* Navbar */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex gap-4">
            {data.company.tabs.map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium pb-2 px-1 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                } transition-all duration-200`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-blue-50 px-3 py-1.5 rounded-lg text-sm text-blue-600">
            Stock of the Day: {data.company.name} ({data.company.price} {data.company.change})
          </div>
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {data.company.name}
              <span className="text-lg ml-4 text-green-600">
                {data.company.price} {data.company.change}
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {data.analysis.performance.map((item, idx) => (
                <PerformanceIndicator key={idx} item={item} />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {data.analysis.swot.map((item, idx) => (
                <SWOTAnalysis key={idx} item={item} />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
              {data.company.financials.overview.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-base font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className="p-6 text-gray-600">
            <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">Financial Statements</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Income Statement</h3>
                <FinancialTable
                  headers={["Year", "Net Sales", "Operating Profit", "Net Profit", "EPS", "Net Profit Margin %"]}
                  rows={data.company.financials.incomeStatements}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Sheet</h3>
                <FinancialTable
                  headers={["Year", "Share Holders Funds", "Non-Current Liabilities", "Current Liabilities", "Total Liabilities", "Total Assets"]}
                  rows={data.company.financials.balanceSheets}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cash Flow Statement</h3>
                <FinancialTable
                  headers={["Year", "Operating Activities", "Investing Activities", "Financing Activities", "Net Cash Flow"]}
                  rows={data.company.financials.cashFlows}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "peers" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sector: {data.peers.sector}</h2>
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Industry: {data.peers.industry}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {data.analysis.performance.map((item, idx) => (
                <PerformanceIndicator key={idx} item={item} />
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {data.analysis.swot.map((item, idx) => (
                <SWOTAnalysis key={idx} item={item} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-8">
              {data.peers.metrics.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-base font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-4">Peer Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {["Symbol", "Price", "Chg %", "M.Cap (Cr)", "Net Profit-Qtr", "1 Yr %", "P/E(TTM)", "Book Value", "ROE", "Promoter Holding", "FII Holding"].map(
                      (header, idx) => (
                        <th key={idx} className="text-left px-4 py-2 text-gray-600 text-sm">{header}</th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.peers.comparison.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;