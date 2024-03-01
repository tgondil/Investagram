import React, { useState } from 'react';
import axios from 'axios';

const NewPollForm = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/polls', { title, options });
      // Clear form fields
      setTitle('');
      setOptions(['', '']);
      // Optionally, refresh poll list
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            Option {index + 1}:
            <input
              type="text"
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddOption}>Add Option</button>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default NewPollForm;
