import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poll from './Poll';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get('/api/polls')
      .then(response => setPolls(response.data))
      .catch(error => console.error('Error fetching polls:', error));
  }, []);

  return (
    <div>
      <h1>Polls</h1>
      {polls.map(poll => <Poll key={poll._id} poll={poll} />)}
    </div>
  );
};

export default PollList;
