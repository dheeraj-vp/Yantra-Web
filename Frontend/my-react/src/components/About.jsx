import React, { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Financial data
  const financials = [
    { label: "Open", value: "₹662.00" },
    { label: "Prev. Close", value: "₹661.60" },
    { label: "Market Cap", value: "₹2.39L Cr" },
    { label: "Beta", value: "1.38" },
    { label: "Shares", value: "368.12 Cr" },
    { label: "Volume", value: "1.32 Cr" },
    { label: "Traded Value", value: "₹796.54 Cr" },
    { label: "1M Avg. Vol", value: "1.40 Cr" },
    { label: "Day Low", value: "₹645.65" },
    { label: "Day High", value: "₹665.00" },
    { label: "52 Wk Low", value: "₹645.65" },
    { label: "52 Wk High", value: "₹1179.00" },
    { label: "Div. Yield", value: "0.93%" },
    { label: "ROE", value: "36.97%" },
    { label: "EPS TTM", value: "₹86.30" },
    { label: "P/E TTM", value: "7.52" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      {/* Navbar */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex gap-4">
            {["overview", "financials", "peers"].map((tab) => (
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
            Stock of the Day: Tata Motors (₹662.00 ▲1.2%)
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
              Tata Motors Ltd.
              <span className="text-lg ml-4 text-green-600">₹662.00 ▲1.2%</span>
            </h1>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Quality", score: "88/100", remark: "High Financial Strength" },
                { label: "Valuation", score: "78/100", remark: "Affordable Valuation" },
                { label: "Technical", score: "28/100", remark: "Technically Bearish" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm">
                  <h2 className="text-sm font-medium text-gray-500">{item.label}</h2>
                  <p className="text-xl font-semibold text-gray-900 my-1">{item.score}</p>
                  <p className="text-sm text-gray-500">{item.remark}</p>
                </div>
              ))}
            </div>

            {/* SWOT Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Strengths", value: 12, color: "text-green-600" },
                { label: "Weaknesses", value: 5, color: "text-red-600" },
                { label: "Opportunities", value: 1, color: "text-blue-600" },
                { label: "Threats", value: 1, color: "text-orange-600" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm text-center">
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Financial Data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
              {financials.map((item, idx) => (
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
    <h2 className="text-lg font-semibold text-center text-gray-800">Financials</h2>

    {/* Income Statement */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Income Statement</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Net Sales</th>
              <th className="p-2 border">Operating Profit</th>
              <th className="p-2 border">Net Profit</th>
              <th className="p-2 border">EPS</th>
              <th className="p-2 border">Net Profit Margin %</th>
            </tr>
          </thead>
          <tbody>
            {[
              { Year: "Mar 2021", NetSales: 30175.03, OperatingProfit: 1454.38, NetProfit: -2395.44, EPS: -6.59, NetProfitMargin: -7.94 },
              { Year: "Mar 2022", NetSales: 47263.68, OperatingProfit: 1498.93, NetProfit: -1390.86, EPS: -3.63, NetProfitMargin: -2.94 },
              { Year: "Mar 2023", NetSales: 65757.33, OperatingProfit: 4531.05, NetProfit: 2728.13, EPS: 7.11, NetProfitMargin: 4.15 },
              { Year: "Mar 2024", NetSales: 73303.08, OperatingProfit: 7615.11, NetProfit: 7902.08, EPS: 20.61, NetProfitMargin: 10.78 },
              { Year: "TTM 2024", NetSales: 69680.24, OperatingProfit: 7976.34, NetProfit: 6197.4, EPS: 16.53, NetProfitMargin: 8.89 }
            ].map((row, index) => (
              <tr key={index} className="text-center border">
                <td className="p-2 border">{row.Year}</td>
                <td className="p-2 border">{row.NetSales.toLocaleString()}</td>
                <td className="p-2 border">{row.OperatingProfit.toLocaleString()}</td>
                <td className="p-2 border">{row.NetProfit.toLocaleString()}</td>
                <td className="p-2 border">{row.EPS}</td>
                <td className="p-2 border">{row.NetProfitMargin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Balance Sheet */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Balance Sheet</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Share Holders Funds</th>
              <th className="p-2 border">Non-Current Liabilities</th>
              <th className="p-2 border">Current Liabilities</th>
              <th className="p-2 border">Total Liabilities</th>
              <th className="p-2 border">Total Assets</th>
            </tr>
          </thead>
          <tbody>
            {[
              { Year: "Mar 2020", SHF: 18387.65, NCL: 18391.4, CL: 25810.82, TL: 62589.87, TA: 62589.87 },
              { Year: "Mar 2021", SHF: 19055.97, NCL: 19752.14, CL: 26251.55, TL: 65059.66, TA: 65059.66 },
              { Year: "Mar 2022", SHF: 19937.76, NCL: 16962.91, CL: 26992.81, TL: 63899.87, TA: 63899.87 },
              { Year: "Mar 2023", SHF: 22467.39, NCL: 13497.39, CL: 25803.53, TL: 61770.77, TA: 61770.77 },
              { Year: "Mar 2024", SHF: 30141.33, NCL: 8614.53, CL: 27326.16, TL: 66083.74, TA: 66083.74 }
            ].map((row, index) => (
              <tr key={index} className="text-center border">
                <td className="p-2 border">{row.Year}</td>
                <td className="p-2 border">{row.SHF.toLocaleString()}</td>
                <td className="p-2 border">{row.NCL.toLocaleString()}</td>
                <td className="p-2 border">{row.CL.toLocaleString()}</td>
                <td className="p-2 border">{row.TL.toLocaleString()}</td>
                <td className="p-2 border">{row.TA.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Cash Flow */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Cash Flow</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Operating Activities</th>
              <th className="p-2 border">Investing Activities</th>
              <th className="p-2 border">Financing Activities</th>
              <th className="p-2 border">Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {[
              { Year: "Mar 2020", OA: -1454.59, IA: -4718.86, FA: 7749.21, NCF: 1657.9 },
              { Year: "Mar 2021", OA: 6680.32, IA: -2991.32, FA: -3471.91, NCF: 220.24 },
              { Year: "Mar 2022", OA: 5281.93, IA: -3149.49, FA: -515.84, NCF: 84.69 },
              { Year: "Mar 2023", OA: 4775.43, IA: 922.67, FA: -7021.32, NCF: -1328.8 },
              { Year: "Mar 2024", OA: 8661.71, IA: 1488.19, FA: -7930.45, NCF: 2223.46 }
            ].map((row, index) => (
              <tr key={index} className="text-center border">
                <td className="p-2 border">{row.Year}</td>
                <td className="p-2 border">{row.OA.toLocaleString()}</td>
                <td className="p-2 border">{row.IA.toLocaleString()}</td>
                <td className="p-2 border">{row.FA.toLocaleString()}</td>
                <td className="p-2 border">{row.NCF.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}



        {activeTab === "peers" && (
           <div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Sector: Automobiles & Auto Components</h2>
           <h3 className="text-lg font-semibold text-gray-700 mb-2">Industry: Cars & Utility Vehicles</h3>
           <p className="text-gray-600 text-sm mb-6">Last Updated: 15:59 Feb 27</p>
       
           {/* Performance Indicators */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
             {[
               { label: "Quality", score: "88/100", remark: "High Financial Strength" },
               { label: "Valuation", score: "78/100", remark: "Affordable Valuation" },
               { label: "Technical", score: "28/100", remark: "Technically Bearish" },
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm">
                 <h2 className="text-sm font-medium text-gray-500">{item.label}</h2>
                 <p className="text-xl font-semibold text-gray-900 my-1">{item.score}</p>
                 <p className="text-sm text-gray-500">{item.remark}</p>
               </div>
             ))}
           </div>
       
           {/* SWOT Analysis */}
           <div className="grid grid-cols-4 gap-4 mb-8">
             {[
               { label: "Strength", value: 12, color: "text-green-600" },
               { label: "Weakness", value: 5, color: "text-red-600" },
               { label: "Opportunity", value: 1, color: "text-blue-600" },
               { label: "Threats", value: 1, color: "text-orange-600" },
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm text-center">
                 <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                 <p className="text-sm text-gray-500 mt-1">{item.label}</p>
               </div>
             ))}
           </div>
       
           {/* Key Financial Metrics */}
           <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-8">
             {[
               { label: "Market Cap (Cr)", value: "₹2.39L" },
               { label: "PE Ratio", value: "7.52" },
               { label: "Price to Book Ratio", value: "2.36" },
               { label: "RSI", value: "31.71" },
               { label: "Net Profit Margin", value: "7.16%" },
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col">
                 <span className="text-sm text-gray-500">{item.label}</span>
                 <span className="text-base font-medium text-gray-900">{item.value}</span>
               </div>
             ))}
           </div>
       
           {/* Peers Comparison Table */}
           <h3 className="text-lg font-semibold text-gray-700 mb-4">Peer Comparison</h3>
           <div className="overflow-x-auto">
             <table className="min-w-full bg-white border rounded-lg shadow-sm">
               <thead>
                 <tr className="bg-gray-100">
                   {["Symbol", "Price", "Chg %", "M.Cap (Cr)", "Net Profit-Qtr", "1 Yr %", "P/E(TTM)", "Book Value", "ROE", "Promoter Holding", "FII Holding"].map((header, idx) => (
                     <th key={idx} className="text-left px-4 py-2 text-gray-600 text-sm">{header}</th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {[
                   ["MARUTI", "₹12,380.60", "-0.77%", "₹389,249.25", "₹3,726.90", "7.65%", "26.77", "₹2,834.77", "15.75%", "58.28%", "15.47%"],
                   ["M&M", "₹2,726.55", "-1.85%", "₹339,054.35", "-", "39.78%", "27.37", "₹567.46", "17.02%", "-", "-"],
                   ["TATAMOTORS", "₹648.55", "-1.97%", "₹238,743.53", "₹5,451.00", "-32.63%", "7.52", "₹274.54", "36.97%", "42.58%", "18.66%"],
                   ["HYUNDAI", "₹1,723.00", "-5.66%", "₹140,000.83", "₹1,160.73", "-", "24.56", "₹166.47", "56.81%", "82.50%", "6.70%"],
                   ["FORCEMOT", "₹6,601.45", "-3.26%", "₹8,698.24", "-", "8.56%", "17.18", "₹1,883.41", "17.20%", "-", "-"],
                   ["MERCURYEV", "₹63.40", "-5.05%", "₹1,204.43", "-", "-28.75%", "181.14", "₹9.88", "2.46%", "-", "-"],
                   ["HINDMOTORS", "₹23.53", "-4.00%", "₹490.98", "₹3.34", "19.75%", "15.16", "₹1.06", "-105.63%", "32.34%", "0.07%"],
                 ].map((row, rowIndex) => (
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
