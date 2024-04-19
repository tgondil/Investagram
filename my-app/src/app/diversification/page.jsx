// src/app/stockRecommendations/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";

const StockRecommendationsPage = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_KEY;

  useEffect(() => {
    fetchStockRecommendations();
  }, []);

  const fetchStockRecommendations = async () => {
    setIsLoading(true);
    const url = `https://api.example.com/recommendations?apikey=${apiKey}`; // Replace with actual URL
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStocks(data.recommendations || []);
    } catch (error) {
      console.error('Error fetching stock recommendations:', error);
      setError('Failed to fetch stock recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5 bg-shark-950" />
        <div className="w-4/5 h-screen bg-shark-950 flex flex-col">
          <div className="p-10">
            <h2 className="text-3xl text-white font-semibold text-center mb-6">
              Stocks Recommendations Handpicked for you
            </h2>
            {isLoading ? (
              <p className="text-center text-white">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <ul className="bg-white rounded-lg shadow-xl p-4">
                {stocks.map((stock, index) => (
                  <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <strong>{stock.symbol}</strong> - {stock.name}
                    <span className="float-right text-blue-500 hover:text-blue-700">
                      More Details
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StockRecommendationsPage;
