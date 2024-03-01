// PollsPage.jsx

import React, { useState, useEffect } from "react";
import PollCard from "./PollCard";
import axios from "axios";

export default function PollsPage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("/api/polls");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  return (
    <main>
      <h1>Polls</h1>
      <div className="polls-container">
        {polls.map((poll) => (
          <PollCard key={poll._id} poll={poll} />
        ))}
      </div>
    </main>
  );
}
