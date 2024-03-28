// PollCard.jsx

import React, { useState } from "react";
import axios from "axios";

const PollCard = ({ poll }) => {
  const [voted, setVoted] = useState(false);

  const handleVote = async (optionId) => {
    try {
      await axios.post(`/api/polls/${poll.id}/vote`, { optionId });
      setVoted(true);
      // Optionally, update poll data to display updated vote counts
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="poll-card">
      <h2>{poll.title}</h2>
      <ul>
        {poll.options.map((option) => (
          <li key={option.id}>
            {option.text}
            {!voted && (
              <button onClick={() => handleVote(option.id)}>Vote</button>
            )}
            <span>{option.votes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollCard;
