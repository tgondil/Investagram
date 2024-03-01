import React from "react";

const PollCard = ({ poll }) => {
  const { title, options } = poll;

  return (
    <div className="poll-card">
      <h2>{title}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default PollCard;
