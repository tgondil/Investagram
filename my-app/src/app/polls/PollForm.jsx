import React, { useState } from "react";

const PollForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and submission
    onSubmit({ title, options });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <button type="button" onClick={() => setOptions([...options, ""])}>
        Add Option
      </button>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollForm;
