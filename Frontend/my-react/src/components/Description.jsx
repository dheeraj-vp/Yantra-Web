import React, { useState, useEffect } from "react";
import data from "../data/dashboardData.json";

const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images = {
    "nifty50": "/nifty50.png",
    "niftybank": "/niftybank.png",
    "sensex": "/bse.png",
    "gift_nifty": "/image.png"
  };

  useEffect(() => {
    setSelectedIndex(data.marketIndices[0]);
  }, []);

  const MarketIndexCard = ({ index }) => (
    <button
      className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
        selectedIndex?.name === index.name
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
          : "bg-white hover:bg-gray-50 border border-gray-100"
      } shadow-xs hover:shadow-sm`}
      onClick={() => setSelectedIndex(index)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">{index.name}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{index.value}</p>
          <span className={`text-sm ${index.color} font-medium`}>{index.change}</span>
        </div>
        <div className="text-right">
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            1D: {index.return}
          </span>
        </div>
      </div>
    </button>
  );

  const StockRow = ({ stock }) => (
    <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group">
      <span className="font-medium text-gray-800 flex-1">{stock.name}</span>
      <span className="text-gray-900 font-semibold flex-1 text-right">
        ₹{stock.price.toLocaleString()}
      </span>
      <span className={`${stock.color} font-semibold flex-1 text-right`}>
        {stock.change}
      </span>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Market Indices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.marketIndices.map((index, idx) => (
              <MarketIndexCard key={idx} index={index} />
            ))}
          </div>

          {/* Selected Index Details */}
          {selectedIndex && (
            <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <img 
                    src={images[selectedIndex.image]} 
                    alt={selectedIndex.name}
                    className="w-full h-48 object-contain p-4"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedIndex.name} Performance
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-sm text-gray-600 mb-1">Today's Low</p>
                      <p className="text-xl font-semibold text-blue-700">
                        ₹{selectedIndex.low}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <p className="text-sm text-gray-600 mb-1">Today's High</p>
                      <p className="text-xl font-semibold text-green-700">
                        ₹{selectedIndex.high}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Gainers & Losers Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-50 p-2 rounded-lg mr-3 border border-green-100">
                  <span className="text-green-600 text-xl">📈</span>
                </div>
                <h2 className="text-lg font-semibold">Top Gainers</h2>
              </div>
              <div className="space-y-2">
                {data.topGainers.map((stock, idx) => (
                  <StockRow key={idx} stock={stock} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 p-2 rounded-lg mr-3 border border-red-100">
                  <span className="text-red-600 text-xl">📉</span>
                </div>
                <h2 className="text-lg font-semibold">Top Losers</h2>
              </div>
              <div className="space-y-2">
                {data.topLosers.map((stock, idx) => (
                  <StockRow key={idx} stock={stock} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Commodities Section */}
          <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-blue-50 p-2 rounded-lg mr-3 border border-blue-100">📦</span>
              Commodities
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {data.commodities.map((commodity, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{commodity.name}</p>
                      <p className={`text-sm ${commodity.color} font-medium`}>{commodity.change}</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{commodity.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FII/DII Activity */}
          <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-purple-50 p-2 rounded-lg mr-3 border border-purple-100">🏛</span>
              Institutional Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">FII (Cr)</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">DII (Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.fiiDiiData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-700">{item.date}</td>
                      <td className="p-3 text-red-600 font-semibold">{item.netFII}</td>
                      <td className="p-3 text-green-600 font-semibold">{item.netDII}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;