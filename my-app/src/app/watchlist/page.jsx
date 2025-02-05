// src/app/watchlist/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";

const WatchlistPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const apiKey = "UVHRM0C06E7HSYBI"; // Use your actual API key

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchSymbolSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const fetchWatchlist = async () => {
    // Here you would fetch the actual watchlist from your backend or local storage
    // This is a placeholder for initial data
    setWatchlist([{ symbol: 'AAPL', name: 'Apple Inc.', price: 'Fetching...' }, { symbol: 'MSFT', name: 'Microsoft Corporation', price: 'Fetching...' }]);
    // Fetch prices for the initial watchlist
    watchlist.forEach(stock => {
      fetchStockPrice(stock.symbol);
    });
  };

  const fetchSymbolSuggestions = async () => {
    const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSuggestions(data.bestMatches || []);
    } catch (error) {
      console.error('Error fetching symbol suggestions:', error);
    }
  };

  const fetchStockPrice = async (symbol) => {
    const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await fetch(priceUrl);
      const { 'Global Quote': globalQuote } = await response.json();
      if (globalQuote) {
        const price = globalQuote['05. price'];
        // Update watchlist with the new price
        setWatchlist(currentList =>
          currentList.map(stock =>
            stock.symbol === symbol ? { ...stock, price } : stock
          )
        );
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  const handleSearch = async (symbol) => {
    setSearchTerm(symbol);
    setSuggestions([]);
    fetchStockPrice(symbol);
  };

  const addToWatchlist = (symbol) => {
    const stockAlreadyInWatchlist = watchlist.some(stock => stock.symbol === symbol);
    if (!stockAlreadyInWatchlist) {
      const newStock = { symbol, name: 'Fetching...', price: 'Fetching...' };
      setWatchlist([...watchlist, newStock]);
      fetchStockPrice(symbol);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5 bg-shark-950" />
        <div className="w-4/5 h-screen bg-shark-950 flex flex-col">
          <div className="p-10">
            <h2 className="text-3xl text-white font-semibold text-center mb-6">My Watchlist</h2>
            <div className="relative flex items-center gap-6">
              <input
                type="text"
                placeholder="Search stock (e.g., AAPL)"
                className="text-m w-3/4 font-semibold py-2 px-4 rounded-lg shadow-xl focus:outline-none text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addToWatchlist(searchTerm)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addToWatchlist(searchTerm)}
              >
                Add
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-3/4 bg-white shadow-xl rounded-lg z-10 text-black">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSearch(item['1. symbol'])}
                    >
                      {item['1. symbol']} - {item['2. name']}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="mt-6 space-y-4">
              {watchlist.map((stock, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow text-black">
                  <div>
                    <span className="font-semibold text-lg">{stock.symbol}</span> - {stock.name || 'N/A'}
                    <div>Price: ${stock.price || 'Fetching...'}</div>
                  </div>
                  <button
                    className="bg-red-500 text-white rounded px-4 py-1"
                    onClick={() => removeFromWatchlist(stock.symbol)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchlistPage;
