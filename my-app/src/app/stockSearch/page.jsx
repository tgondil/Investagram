// src/app/stockSearch/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";

const StockSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [stockData, setStockData] = useState(null);

  const apiKey = "EOKPKWT5S708YGQF"; // Replace with your actual API key

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchSymbolSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, apiKey]);

  const fetchSymbolSuggestions = async () => {
    const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      console.log(data)
      setSuggestions(data.bestMatches || []);
    } catch (error) {
      console.error('Error fetching symbol suggestions:', error);
    }
  };

  const fetchStockData = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSearch = (symbol) => {
    setSearchTerm(symbol);
    fetchStockData(symbol);
    setSuggestions([]); // Hide suggestions after selection
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const addToWatchlist = () => {
    console.log('Add to watchlist:', stockData?.Symbol);
    // Implement the logic to add the stock to the watchlist here
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
            <div className="relative flex items-center gap-6">
              <input
                type="text"
                placeholder="AAPL or Apple"
                className="text-m w-3/4 font-semibold py-2 px-4 rounded-lg shadow-xl focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleEnter}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                onClick={() => handleSearch(searchTerm)}
              >
                Enter
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-3/4 bg-white text-black shadow-xl rounded-lg z-10">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black "
                      onClick={() => handleSearch(item['1. symbol'])}
                    >
                      {item['1. symbol']} - {item['2. name']}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {stockData && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow overflow-y-auto max-h-96">
                <h3 className="text-lg font-semibold mb-4">Stock Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(stockData).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 p-2 rounded">
                      <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addToWatchlist}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                >
                  ★ Add to Watchlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StockSearchPage;
