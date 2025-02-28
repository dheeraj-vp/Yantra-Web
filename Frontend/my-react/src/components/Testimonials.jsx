import React from "react";

const IPOData = [
  {
    name: "Quality Power El",
    currentPrice: 378.7,
    change: -11.4,
    changePercent: -2.92,
    offerPrice: 425,
    listingPrice: 430,
    listingGain: 1.18,
    gainSinceListing: -11.9,
    timesSubscribed: 1.29,
    listingDate: "24-Feb-2025",
  },
  {
    name: "Hexaware Tech.",
    currentPrice: 804.35,
    change: -22.25,
    changePercent: -2.69,
    offerPrice: 708,
    listingPrice: 731,
    listingGain: 3.25,
    gainSinceListing: 10.0,
    timesSubscribed: 2.66,
    listingDate: "19-Feb-2025",
  },
  {
    name: "Ajax Engineering",
    currentPrice: 592.3,
    change: -8.65,
    changePercent: -1.44,
    offerPrice: 629,
    listingPrice: 576,
    listingGain: -8.43,
    gainSinceListing: 2.8,
    timesSubscribed: 6.44,
    listingDate: "17-Feb-2025",
  },
  {
    name: "Dr Agarwal's Hea",
    currentPrice: 398,
    change: -9.15,
    changePercent: -2.25,
    offerPrice: 402,
    listingPrice: 402,
    listingGain: 0,
    gainSinceListing: -1.0,
    timesSubscribed: 1.55,
    listingDate: "04-Feb-2025",
  },
  {
    name: "Denta Water",
    currentPrice: 301.15,
    change: -5.7,
    changePercent: -1.86,
    offerPrice: 294,
    listingPrice: 325,
    listingGain: 10.54,
    gainSinceListing: -7.3,
    timesSubscribed: 221.68,
    listingDate: "29-Jan-2025",
  },
  {
    name: "Stallion India",
    currentPrice: 63.75,
    change: -1.03,
    changePercent: -1.59,
    offerPrice: 90,
    listingPrice: 120,
    listingGain: 33.33,
    gainSinceListing: -46.9,
    timesSubscribed: 188.37,
    listingDate: "23-Jan-2025",
  },
];

const IPOCard = ({ ipo }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <h2 className="text-lg font-semibold text-gray-900">{ipo.name}</h2>
      <p className="text-sm text-gray-500">{ipo.listingDate}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-gray-800">₹{ipo.currentPrice}</span>
        <span
          className={`text-sm px-2 py-1 rounded-md ${
            ipo.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {ipo.change} ({ipo.changePercent}%)
        </span>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Offer Price:</span> ₹{ipo.offerPrice}
        </p>
        <p>
          <span className="font-medium">Listing Price:</span> ₹{ipo.listingPrice}
        </p>
        <p>
          <span className="font-medium">Listing Gain:</span> {ipo.listingGain}%
        </p>
        <p>
          <span className="font-medium">Gain Since Listing:</span> {ipo.gainSinceListing}%
        </p>
        <p>
          <span className="font-medium">Times Subscribed:</span> {ipo.timesSubscribed}x
        </p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Invest Now
      </button>
    </div>
  );
};

const IPOs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 sm:px-12 lg:px-24">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Open & Upcoming IPOs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated on the latest IPOs and track their performance.
        </p>
      </header>

      {/* No Upcoming IPOs */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center text-gray-600">
        <p className="text-lg font-medium">No ongoing or upcoming IPOs.</p>
      </div>

      {/* Recently Listed IPOs */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Listed IPOs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IPOData.map((ipo, index) => (
            <IPOCard key={index} ipo={ipo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default IPOs;
