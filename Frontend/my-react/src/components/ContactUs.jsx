import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const advisoryData = {
  active: [],
  closed: [
    {
      exitDate: "Feb 28, 2025, 10:47 AM",
      name: "IIFL Finance",
      ticker: "IIFL",
      netGainLoss: "-43.91%",
      exitPrice: "₹311.50",
      entryPrice: "₹555.35",
      target: "₹600.00",
    },
    {
      exitDate: "Feb 27, 2025, 11:43 AM",
      name: "Anant Raj",
      ticker: "ANANTRAJ",
      netGainLoss: "-42.57%",
      exitPrice: "₹487.55",
      entryPrice: "₹849.00",
      target: "₹1,100.00",
    },
    {
      exitDate: "Feb 27, 2025, 11:42 AM",
      name: "P N Gadgil Jewellers",
      ticker: "PNGJL",
      netGainLoss: "-30.86%",
      exitPrice: "₹546.00",
      entryPrice: "₹789.75",
      target: "₹950.00",
    },
    {
      exitDate: "Feb 26, 2025, 02:15 PM",
      name: "HDFC Bank",
      ticker: "HDFCBANK",
      netGainLoss: "-12.78%",
      exitPrice: "₹1,420.00",
      entryPrice: "₹1,628.00",
      target: "₹1,900.00",
    },
    {
      exitDate: "Feb 25, 2025, 10:30 AM",
      name: "Reliance Industries",
      ticker: "RELIANCE",
      netGainLoss: "-8.92%",
      exitPrice: "₹2,615.75",
      entryPrice: "₹2,875.00",
      target: "₹3,200.00",
    },
    {
      exitDate: "Feb 24, 2025, 01:05 PM",
      name: "Tata Motors",
      ticker: "TATAMOTORS",
      netGainLoss: "-18.62%",
      exitPrice: "₹678.20",
      entryPrice: "₹833.50",
      target: "₹950.00",
    },
    {
      exitDate: "Feb 22, 2025, 03:40 PM",
      name: "Larsen & Toubro",
      ticker: "LT",
      netGainLoss: "-9.57%",
      exitPrice: "₹3,038.00",
      entryPrice: "₹3,360.00",
      target: "₹3,700.00",
    },
    {
      exitDate: "Feb 27, 2025, 11:41 AM",
      name: "State Bank of India",
      ticker: "SBIN",
      netGainLoss: "-15.45%",
      exitPrice: "₹708.50",
      entryPrice: "₹837.95",
      target: "₹1,000.00",
    },
    {
      exitDate: "Feb 27, 2025, 11:40 AM",
      name: "UltraTech Cement",
      ticker: "ULTRACEMCO",
      netGainLoss: "-11.40%",
      exitPrice: "₹10,275.20",
      entryPrice: "₹11,597.30",
      target: "₹13,000.00",
    },
    {
      exitDate: "Feb 27, 2025, 11:39 AM",
      name: "Sunteck Realty",
      ticker: "SUNTECK",
      netGainLoss: "-37.50%",
      exitPrice: "₹383.85",
      entryPrice: "₹614.20",
      target: "₹745.00",
    },
  ],
};

const investors = [
  {
    name: "Premji and Associates",
    portfolioValue: "₹2,24,085.35 Cr",
    numStocks: 1,
    topHoldings: "Wipro Ltd. (72.69%)",
    increase: "-",
    decrease: "Wipro Ltd. (-0.04%)",
    sectorHoldings: "Software & Services (100%)",
  },
  {
    name: "Ashish Dhawan",
    portfolioValue: "₹34,842.15 Cr",
    numStocks: 17,
    topHoldings: "IDFC Ltd. (21.49%), Birlasoft Ltd. (14.71%)",
    increase: "ICICI Securities (5.12%)",
    decrease: "IDFC Ltd. (-1.22%)",
    sectorHoldings: "Financials (48.26%), IT (19.73%)",
  },
  {
    name: "Vijay Kedia",
    portfolioValue: "₹1,987.40 Cr",
    numStocks: 10,
    topHoldings: "Tejas Networks Ltd. (18.45%), Elecon Engineering (10.27%)",
    increase: "Mahindra Holidays (7.89%)",
    decrease: "Vaibhav Global (-3.12%)",
    sectorHoldings: "Industrials (42.89%), Telecom (15.37%)",
  },
  {
    name: "Dolly Khanna",
    portfolioValue: "₹1,462.75 Cr",
    numStocks: 12,
    topHoldings: "Rain Industries Ltd. (19.27%), KCP Ltd. (11.39%)",
    increase: "NDTV Ltd. (9.18%)",
    decrease: "Som Distilleries (-4.72%)",
    sectorHoldings: "Chemicals (28.92%), Consumer Goods (22.74%)",
  },
  {
    name: "Radhakishan Damani",
    portfolioValue: "₹1,59,677.04 Cr",
    numStocks: 13,
    topHoldings: "3M India Ltd. (1.48%), Aptech Ltd. (3.03%)",
    increase: "Advani Hotels & Resorts (4.18%)",
    decrease: "-",
    sectorHoldings: "Retailing (97.46%), Banking (0.75%)",
  },
  {
    name: "Rakesh Jhunjhunwala and Associates",
    portfolioValue: "₹58,596.41 Cr",
    numStocks: 27,
    topHoldings: "Agro Tech Foods (7.03%), Aptech Ltd. (41.41%)",
    increase: "Inventurus Knowledge Solutions (49.34%)",
    decrease: "Nazara Tech (-0.85%), Wockhardt Ltd. (-0.10%)",
    sectorHoldings: "Consumer Services (29.87%), Banking (13.76%)",
  },
];

const MOAdvice = () => {
  const [activeTab, setActiveTab] = useState("closed");

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Investment Insights</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link to="/ace-investors" className="text-blue-600 hover:text-blue-800">
            Ace Investors
          </Link>
        </div>
      </nav>

      {/* Advisory Section */}
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">Advisory Products</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-md font-semibold transition ${
            activeTab === "active"
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active ({advisoryData.active.length})
        </button>
        <button
          className={`px-5 py-2 rounded-md font-semibold transition ${
            activeTab === "closed"
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
          onClick={() => setActiveTab("closed")}
        >
          Closed ({advisoryData.closed.length})
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {advisoryData[activeTab].length === 0 ? (
          <p className="text-gray-500">No {activeTab} advisories available.</p>
        ) : (
          advisoryData[activeTab].map((advice, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {advice.name} ({advice.ticker})
              </h2>
              <p className="text-gray-600 mt-2">
                Net Gain/Loss:{" "}
                <span
                  className={`font-bold ${
                    parseFloat(advice.netGainLoss) < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {advice.netGainLoss}
                </span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* Ace Investors Section */}
      <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">Ace Investors Portfolios</h2>
      <p className="text-gray-600 mb-6">
        Learn how institutional investors, FIIs, and individual market investors such as Premji and
        Associates, Radhakishan Damani, and Rakesh Jhunjhunwala maintain top positions with detailed insights into their portfolios.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Investor</th>
              <th className="p-3">Portfolio Value</th>
              <th className="p-3">No. of Stocks</th>
              <th className="p-3">Top Holdings</th>
              <th className="p-3">Increase</th>
              <th className="p-3">Decrease</th>
              <th className="p-3">Sector Holdings</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((investor, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{investor.name}</td>
                <td className="p-3">{investor.portfolioValue}</td>
                <td className="p-3">{investor.numStocks}</td>
                <td className="p-3">{investor.topHoldings}</td>
                <td className="p-3">{investor.increase}</td>
                <td className="p-3">{investor.decrease}</td>
                <td className="p-3">{investor.sectorHoldings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MOAdvice;
