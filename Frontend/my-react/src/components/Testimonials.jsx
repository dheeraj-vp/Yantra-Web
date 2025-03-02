import React from "react";
import data from "../data/ipoData.json";

const IPOCard = ({ ipo }) => {
  const isPositive = (value) => value >= 0;
  const subscriptionPercentage = Math.min(ipo.timesSubscribed * 10, 100);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{ipo.name}</h2>
          <p className="text-sm text-gray-500">{ipo.listingDate}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPositive(ipo.change)
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive(ipo.change) ? "▲" : "▼"} {Math.abs(ipo.change)} (
          {Math.abs(ipo.changePercent)}%)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Offer Price</p>
          <p className="font-semibold text-gray-900">₹{ipo.offerPrice}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Listing Price</p>
          <p className="font-semibold text-gray-900">₹{ipo.listingPrice}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Price</span>
          <span className="text-xl font-bold text-gray-900">
            ₹{ipo.currentPrice}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Listing Gain</span>
            <span
              className={`text-sm ${
                isPositive(ipo.listingGain)
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {ipo.listingGain}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Since Listing</span>
            <span
              className={`text-sm ${
                isPositive(ipo.gainSinceListing)
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {ipo.gainSinceListing}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subscription</span>
            <span className="font-medium text-gray-900">
              {ipo.timesSubscribed}x
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${subscriptionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
        Invest Now →
      </button>
    </div>
  );
};

const IPOs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            IPO Market Watch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track upcoming and recently listed IPOs with real-time performance metrics
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Open & Upcoming IPOs
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border-2 border-dashed border-gray-200">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-600">
              No ongoing or upcoming IPOs at the moment
            </p>
            <p className="text-gray-500 mt-2">
              Check back later for new IPO listings
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recently Listed IPOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.ipos.recent.map((ipo, index) => (
              <IPOCard key={index} ipo={ipo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IPOs;