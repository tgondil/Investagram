"use client";

import React from 'react';
import Sidebar from '../../components/sidebar';

const StockRecommendationsPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleStockClick = (symbol) => {
    // Redirect to the stockSearch page using native browser redirect
    window.location.href = `/stockSearch?symbol=${symbol}`;
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex justify-center items-center h-full">
        <Sidebar className="w-1/5 bg-shark-950" />
        <div className="w-4/5 flex flex-col justify-center items-center">
          <h2 className="text-3xl text-white font-semibold text-center mb-6">
            Stock Recommendations Handpicked for You
          </h2>
          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-x-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded-lg"
                onClick={() => handleStockClick("META")}
              >
                META
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded-lg"
                onClick={() => handleStockClick("IBM")}
              >
                IBM
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded-lg"
                onClick={() => handleStockClick("ORCL")}
              >
                ORCL
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default StockRecommendationsPage;
