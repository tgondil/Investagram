'use client'

import React, { useState } from "react";
import axios from 'axios'; // Make sure to import axios
import Sidebar from "../../components/sidebar";
// import Feed from "@/components/feed"; // Uncomment if Feed is used

const StockSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // React state for search term
  const [stockData, setStockData] = useState(null); // React state for stock data

  // Function for fetching stock data
  const fetchStockData = async (symbol) => {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      setStockData(response.data); // axios handles JSON parsing automatically
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };
    
  const handleSearch = () => {
    fetchStockData(searchTerm); // Fetch stock data when search is initiated
  };
  
  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5 bg-shark-950" />
        <div className="w-4/5 h-screen bg-shark-950 flex flex-col">
          <div className="p-10">
            <h2 className="text-3xl text-white font-semibold text-center mb-6">
              Search Stocks Here
            </h2>
            <div className="flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="AAPL or Apple"
                className="text-m w-3/4 font-semibold py-2 px-4 rounded-lg shadow-xl focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="text-m font-semibold bg-tacao-300 flex justify-center items-center text-white rounded-lg px-6 py-2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          {/* You can render stockData below or pass it to another component */}
          {/* {stockData && <YourComponentWithStockData stockData={stockData} />} */}
        </div>
      </div>
    </main>
  );
};

export default StockSearchPage;
