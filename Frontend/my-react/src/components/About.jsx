import React, { useState } from "react";
import data from "../data/stockData.json";

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Reusable components
  const PerformanceIndicator = ({ item }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
        <h2 className="text-sm font-semibold text-gray-600">{item.label}</h2>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{item.score}</p>
      <p className="text-sm text-gray-500 font-medium">{item.remark}</p>
    </div>
  );

  const SWOTAnalysis = ({ item }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
      <div className={`text-4xl font-bold mb-2 ${item.color}`}>
        {item.value}
        <span className="text-lg ml-1">/20</span>
      </div>
      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {item.label}
      </p>
    </div>
  );

  const FinancialTable = ({ headers, rows, title }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <h3 className="text-lg font-semibold bg-gray-50 p-4 border-b">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors even:bg-gray-50"
              >
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    className="px-4 py-3 text-sm text-gray-700 font-medium"
                  >
                    {typeof value === "number" ? (
                      <span className={value < 0 ? "text-red-500" : ""}>
                        {value.toLocaleString()}
                        {idx === headers.length - 1 && "%"}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Navigation Header */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {data.company.tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search and Stock Info */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="bg-blue-100 px-4 py-2 rounded-lg text-sm text-blue-700 font-semibold flex items-center gap-2">
              <span className="text-blue-500">★</span>
              Stock of the Day: {data.company.name} ({data.company.price}{" "}
              <span className="text-green-500">{data.company.change}</span>)
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full lg:w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {activeTab === "overview" && (
          <>
            {/* Company Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.company.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-gray-900">
                  {data.company.price}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {data.company.change}
                </span>
                <span className="text-gray-500 text-sm">
                  NSE: TATAMOTORS • BSE: 500570
                </span>
              </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.analysis.performance.map((item, idx) => (
                <PerformanceIndicator key={idx} item={item} />
              ))}
            </div>

            {/* SWOT Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.analysis.swot.map((item, idx) => (
                <SWOTAnalysis key={idx} item={item} />
              ))}
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Key Financial Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.company.financials.overview.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 font-medium">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "financials" && (
          <div className="space-y-8">
            <FinancialTable
              title="Income Statement (Values in ₹ Crores)"
              headers={["Year", "Net Sales", "Operating Profit", "Net Profit", "EPS", "Margin %"]}
              rows={data.company.financials.incomeStatements}
            />

            <FinancialTable
              title="Balance Sheet (Values in ₹ Crores)"
              headers={["Year", "Shareholders Funds", "Non-Current Liab.", "Current Liab.", "Total Liab.", "Total Assets"]}
              rows={data.company.financials.balanceSheets}
            />

            <FinancialTable
              title="Cash Flow Statement (Values in ₹ Crores)"
              headers={["Year", "Operating", "Investing", "Financing", "Net Flow"]}
              rows={data.company.financials.cashFlows}
            />
          </div>
        )}

        {activeTab === "peers" && (
          <div className="space-y-8">
            {/* Sector Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {data.peers.sector}
                  </h2>
                  <p className="text-gray-500">{data.peers.industry}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {data.peers.metrics.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-lg font-semibold text-blue-600">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peer Comparison */}
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Symbol", "Price", "Change", "Market Cap", "P/E", "ROE", "1Y Return"].map(
                        (header, idx) => (
                          <th
                            key={idx}
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.peers.comparison.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="hover:bg-gray-50 even:bg-gray-50 transition-colors"
                      >
                        {[0, 1, 2, 3, 6, 8, 5].map((cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`px-4 py-3 text-sm ${
                              cellIndex === 0
                                ? "font-semibold text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            {cellIndex === 2 ? (
                              <span
                                className={
                                  row[cellIndex].startsWith("-")
                                    ? "text-red-500"
                                    : "text-green-500"
                                }
                              >
                                {row[cellIndex]}
                              </span>
                            ) : (
                              row[cellIndex]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;