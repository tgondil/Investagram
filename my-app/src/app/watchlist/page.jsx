// src/app/watchlist/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/sidebar";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newStockSymbol, setNewStockSymbol] = useState('');

  useEffect(() => {
    // Fetch the watchlist from the backend on component mount
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get('/api/watchlist');
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  const addToWatchlist = async () => {
    try {
      const response = await axios.post('/api/watchlist', { symbol: newStockSymbol });
      if (response.status === 200) {
        fetchWatchlist();  // Refresh the watchlist after adding a new stock
        setNewStockSymbol('');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      const response = await axios.delete(`/api/watchlist/${symbol}`);
      if (response.status === 200) {
        fetchWatchlist();  // Refresh the watchlist after deleting a stock
      }
    } catch (error) {
      console.error('Error deleting from watchlist:', error);
    }
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5 bg-shark-950" />
        <div className="w-4/5 h-screen bg-shark-950 flex flex-col">
          <div className="p-10">
            <h2 className="text-3xl text-white font-semibold text-center mb-6">
              My Watchlist
            </h2>
            <div className="flex justify-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Add stock symbol (e.g., AAPL)"
                className="text-m w-1/4 font-semibold py-2 px-4 rounded-lg shadow-xl focus:outline-none"
                value={newStockSymbol}
                onChange={(e) => setNewStockSymbol(e.target.value)}
              />
              <button
                className="text-m font-semibold bg-tacao-300 text-white rounded-lg px-4 py-2"
                onClick={addToWatchlist}
              >
                Add to Watchlist
              </button>
            </div>
            <ul className="space-y-4">
              {watchlist.map((stock, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                  <span className="font-semibold text-lg">{stock.symbol}</span>
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
