import React, { useState, useEffect } from "react";

const Dashboard = () => {
  // Import images correctly
  const images = {
    "nifty50": "/nifty50.png",
    "niftybank": "/niftybank.png", 
    "sensex": "/bse.png",
    "gift_nifty": "/image.png"
  };

  const marketIndices = [
    { name: "Nifty 50", value: "22,545.05", change: "-2.50 (-0.01%)", color: "text-red-500", image: "nifty50", low: "22,508.4", high: "22,613.3", return: "-0.01%" },
    { name: "Nifty Bank", value: "48,743.8", change: "+135.45 (+0.28%)", color: "text-green-500", image: "niftybank", low: "48,500.4", high: "48,900.3", return: "+0.28%" },
    { name: "BSE Sensex", value: "74,612.43", change: "+10.31 (+0.01%)", color: "text-green-500", image: "sensex", low: "74,500.2", high: "74,750.8", return: "+0.01%" },
    { name: "GIFT NIFTY", value: "22,576", change: "+30.00 (+0.13%)", color: "text-green-500", image: "gift_nifty", low: "22,530.5", high: "22,620.1", return: "+0.13%" },
  ];

  const fiiDiiData = [
    { date: "27-Feb-2025", netFII: "-556.60", netDII: "1,727.10" },
    { date: "25-Feb-2025", netFII: "-3,529.10", netDII: "3,030.80" },
    { date: "24-Feb-2025", netFII: "-6,286.70", netDII: "5,185.60" },
  ];

  const commodityData = [
    { name: "GOLD", value: "85,201.00", change: "-673.00 (-0.78%)", color: "text-red-500" },
    { name: "SILVER", value: "93,767.00", change: "-874.00 (-0.92%)", color: "text-red-500" },
    { name: "CRUDEOIL", value: "6,140.00", change: "+140.00 (+2.33%)", color: "text-green-500" },
    { name: "NATURALGAS", value: "346.70", change: "-3.00 (-0.86%)", color: "text-red-500" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(marketIndices[0]);

  // Set Nifty 50 as default selected index when component mounts
  useEffect(() => {
    setSelectedIndex(marketIndices[0]);
  }, []);

  return (
    <div className="p-3 bg-gray-50 h-screen font-sans">
      <div className="grid grid-cols-2 gap-3 h-full">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Market Indices as Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {marketIndices.map((index, idx) => (
              <button
                key={idx}
                className={`bg-white p-2 rounded-lg shadow-sm text-left hover:bg-gray-50 transition-all duration-200 ${
                  selectedIndex?.name === index.name ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <h2 className="text-sm font-semibold text-gray-700">{index.name}</h2>
                <p className="text-base font-bold">{index.value}</p>
                <p className={`${index.color} text-xs`}>{index.change}</p>
              </button>
            ))}
          </div>

          {/* Selected Market Index Details */}
          {selectedIndex && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="flex-1">
                <img 
  src={images[selectedIndex.image]} 
  alt={selectedIndex.name} 
  className="w-92 h-50 object-contain" 
/>

                </div>
                <div className="flex-1 border-l border-gray-200 pl-4 space-y-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Today's Low</span>
                    <span className="font-medium">₹{selectedIndex.low}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Today's High</span>
                    <span className="font-medium">₹{selectedIndex.high}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Today's Return</span>
                    <span className={selectedIndex.return.startsWith("-") ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                      {selectedIndex.return}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Gainers & Losers */}
          <div className="grid grid-cols-2 gap-4">
  {/* Top Gainers */}
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-sm font-semibold mb-3 text-gray-700">🔥 TOP GAINERS</h2>
    {[
      { name: "CreditAcc. Gram.", price: 900, change: "▲ 5.2%", color: "text-green-500" },
      { name: "Just Dial", price: 1000, change: "▲ 7.4%", color: "text-green-500" },
      { name: "AU Small Finance", price: 1100, change: "▲ 9.1%", color: "text-green-500" },
      { name: "HDFC Bank", price: 1650, change: "▲ 4.8%", color: "text-green-500" },
      { name: "Tata Motors", price: 950, change: "▲ 6.3%", color: "text-green-500" }
    ].map((stock, index) => (
      <div key={index} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0">
        <p className="font-medium">{stock.name}</p>
        <p className="text-gray-700 font-semibold">₹{stock.price.toFixed(2)}</p>
        <p className={`${stock.color} font-semibold`}>{stock.change}</p>
      </div>
    ))}
  </div>

  {/* Top Losers */}
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-sm font-semibold mb-3 text-gray-700">📉 TOP LOSERS</h2>
    {[
      { name: "KEI Industries", price: 3000, change: "▼ 10.2%", color: "text-red-500" },
      { name: "R R Kabel", price: 2500, change: "▼ 12.5%", color: "text-red-500" },
      { name: "Polycab India", price: 2000, change: "▼ 8.9%", color: "text-red-500" },
      { name: "Bajaj Finance", price: 5200, change: "▼ 6.1%", color: "text-red-500" },
      { name: "Reliance", price: 2800, change: "▼ 7.4%", color: "text-red-500" }
    ].map((stock, index) => (
      <div key={index} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0">
        <p className="font-medium">{stock.name}</p>
        <p className="text-gray-700 font-semibold">₹{stock.price.toFixed(2)}</p>
        <p className={`${stock.color} font-semibold`}>{stock.change}</p>
      </div>
    ))}
  </div>
</div>

        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Commodities */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2 text-gray-700">COMMODITIES</h2>
            <div className="grid grid-cols-4 gap-2">
              {commodityData.map((commodity, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-600">{commodity.name}</h3>
                  <p className="text-sm font-bold">{commodity.value}</p>
                  <p className={`${commodity.color} text-xs`}>{commodity.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FII & DII Activity */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2 text-gray-700">FII & DII ACTIVITY (Rs. Crs.)</h2>
            <div className="overflow-hidden rounded-md">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left font-medium text-gray-600">Date</th>
                    <th className="p-2 text-left font-medium text-gray-600">Net FII</th>
                    <th className="p-2 text-left font-medium text-gray-600">Net DII</th>
                  </tr>
                </thead>
                <tbody>
                  {fiiDiiData.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="p-2 font-medium">{item.date}</td>
                      <td className="p-2 text-red-500 font-semibold">{item.netFII}</td>
                      <td className="p-2 text-green-500 font-semibold">{item.netDII}</td>
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