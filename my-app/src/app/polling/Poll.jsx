import React, { useState } from 'react';
import axios from 'axios';

const Poll = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleVote = async () => {
    try {
      await axios.put(`/api/polls/${poll._id}/vote`, { option: selectedOption });
      // Refresh poll data after voting
    } catch (error) {
      console.error('Error voting on poll:', error);
    }
  };

  return (
    <div>
      <h2>{poll.title}</h2>
      <ul>
        {poll.options.map(option => (
          <li key={option}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Poll;
