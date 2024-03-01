import React, { useState, useEffect } from "react";
import PollCard from "./PollCard";
import axios from "axios";

const PollsPage = () => {
  // Define state for polls
  const [polls, setPolls] = useState([]);

  // Fetch polls data from backend using useEffect
  useEffect(() => {
    // Example API endpoint for fetching polls data
    const apiUrl = "/api/polls";

    axios.get(apiUrl)
      .then(response => {
        setPolls(response.data);
      })
      .catch(error => {
        console.error("Error fetching polls data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="polls-page">
      <h1>Polls Page</h1>
      {/* Render PollCard components for each poll */}
      {polls.map(poll => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollsPage;
